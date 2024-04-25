import { Handlers } from "$fresh/server.ts";
import { createHttpError } from "$std/http/http_errors.ts";
import { Status } from "$std/http/http_status.ts";
import { mergeReadableStreams } from "$std/streams/mod.ts";
import { ulid } from "@std/ulid";

import { splitArray, splitText, uniqFast } from "@/utils/strings.ts";
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
        speed: string;
        splitParagraph: boolean;
      };
      const uniqueParagraphs = uniqFast(
        Array.isArray(data.paragraphs)
          ? data.paragraphs
          : splitText(data.paragraphs),
      );
      console.log(
        "------",
        data.language,
        data.splitParagraph,
        uniqueParagraphs.length,
        "------",
      );
      void increaseTotalAudio(uniqueParagraphs.length);
      const paragraphs = splitArray(
        uniqueParagraphs,
        data.splitParagraph ? 40 : 100,
      );

      const voiceUrls = [];
      for (const subParagraphs of paragraphs) {
        const subStreams = await Promise.all(subParagraphs.map(async (c) => {
          const params = new URLSearchParams({
            ie: "UTF-8",
            client: "tw-ob",
            tl: data.language,
            ttsspeed: data.speed ? data.speed : "1",
          });
          const url = encodeURI(
            `${TRANSLATE_BASE_URL}?${params.toString()}&q=${c}`,
          );
          const file = `${ulid()}.mp3`;
          const s3Key = `${audioDir}/${file}`;
          const res = await fetch(url);
          const blob = await res.blob();
          const stream = blob.stream();

          return { stream, s3Key, text: c };
        }));
        if (data.splitParagraph) {
          voiceUrls.push(
            await Promise.all(
              subStreams.map(async ({ stream, s3Key, text }) => {
                await uploadObject(s3Key, stream);
                const url = await getFileUrl(s3Key);
                return { url, text };
              }),
            ),
          );
        } else {
          const stream = mergeReadableStreams(
            ...subStreams.map((s) => s.stream),
          );
          const file = `${ulid()}.mp3`;
          const s3Key = `${audioDir}/${file}`;
          await uploadObject(s3Key, stream);
          voiceUrls.push({
            url: await getFileUrl(s3Key),
            text: data.paragraphs,
          });
        }
      }
      return Response.json(voiceUrls.flat());
    } catch (_error) {
      console.error(_error);
      throw createHttpError(Status.InternalServerError, _error.message);
    }
  },
};
