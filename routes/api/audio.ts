import { Handlers, Status } from "$fresh/server.ts";
import { createHttpError } from "$std/http/http_errors.ts";
import { mergeReadableStreams } from "$std/streams/mod.ts";

import {
  splitArray,
  splitText,
  toHex,
  truncateString,
  uniqFast,
} from "@/utils/strings.ts";
import { TRANSLATE_BASE_URL } from "@/utils/constants.ts";
import { getFileUrl, uploadObject } from "@/utils/s3.ts";
import { kv, voicesEntryKey } from "@/utils/kv.ts";

interface Query {
  voiceUrls: string[];
}

const audioDir = "audios";

async function increaseTotalAudio(num: number) {
  try {
    const voicesEntry = await kv.get(voicesEntryKey);
    const currentTotal = voicesEntry.value;
    await kv.set(voicesEntryKey, currentTotal + num);
  } catch (error) {
    console.error("increaseTotalAudio error", error);
  }
}

export const handler: Handlers<Query> = {
  async POST(_req, _ctx) {
    try {
      const body = await _req.json();
      const data = body as {
        paragraphs: string | string[];
        language: string;
        splitParagraph: boolean;
      };
      const uniqueParagraphs = uniqFast(
        Array.isArray(data.paragraphs)
          ? data.paragraphs
          : splitText(data.paragraphs),
      );
      console.log(
        "------",
        _req.headers.get("origin"),
        _req.headers.get("user-agent"),
        data.language,
        data.splitParagraph,
        uniqueParagraphs.length,
        "------",
      );
      void increaseTotalAudio(uniqueParagraphs.length);
      const paragraphs = splitArray(
        uniqueParagraphs,
        100,
      );

      const streams = [];
      for (const subParagraphs of paragraphs) {
        const subStreams = await Promise.all(subParagraphs.map(async (c) => {
          const url = encodeURI(
            `${TRANSLATE_BASE_URL}&tl=${data.language}&q=${c}`,
          );
          const file = `${truncateString(toHex(c + data.language))}.mp3`;
          const s3Key = `${audioDir}/${file}`;
          const res = await fetch(url);
          const blob = await res.blob();
          const stream = blob.stream();

          return { stream, s3Key, text: c };
        }));
        streams.push(subStreams);
      }

      const voiceUrls = [];
      if (data.splitParagraph) {
        for (const subStreams of streams) {
          voiceUrls.push(
            await Promise.all(
              subStreams.map(async ({ stream, s3Key, text }) => {
                await uploadObject(s3Key, stream);
                const url = await getFileUrl(s3Key);
                return { url, text };
              }),
            ),
          );
        }

        return Response.json(voiceUrls.flat());
      }

      for (const subStreams of streams) {
        const stream = mergeReadableStreams(...subStreams.map((s) => s.stream));
        const file = `${
          truncateString(toHex(data.paragraphs + data.language))
        }.mp3`;
        const s3Key = `${audioDir}/${file}`;
        await uploadObject(s3Key, stream);
        voiceUrls.push({
          url: await getFileUrl(s3Key),
          text: data.paragraphs,
        });
      }

      return Response.json(voiceUrls.flat());
    } catch (_error) {
      console.error(_error);
      throw createHttpError(Status.InternalServerError, _error.message);
    }
  },
};
