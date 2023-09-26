import { Handlers } from "$fresh/server.ts";
import { splitParagraph, toHex, truncateString } from "@/utils/strings.ts";
import { TRANSLATE_BASE_URL } from "@/utils/constants.ts";
import { getFileUrl, uploadObject } from "@/utils/s3.ts";

interface Query {
  voiceUrls: string[];
}

export const handler: Handlers<Query> = {
  async POST(_req, _ctx) {
    try {
      const body = await _req.json();
      const data = body as { text: string; language: string };
      const chunks = splitParagraph(data.text);
      const settledRes = await Promise.allSettled(chunks.map(async (c) => {
        try {
          const url = encodeURI(
            `${TRANSLATE_BASE_URL}&tl=${data.language}&q=${c}`,
          );
          const dir = "audios";
          const file = `${truncateString(toHex(c + data.language))}.mp3`;
          const res = await fetch(url);
          const blob = await res.blob();
          const stream = blob.stream();

          const s3Key = `${dir}/${file}`;
          await uploadObject(s3Key, stream);
          return { url: getFileUrl(s3Key), text: c };
        } catch (error) {
          console.error(error);
          throw error;
        }
      }));
      const voiceUrls = settledRes.map((s) =>
        s.status === "fulfilled" ? s.value : s.reason
      );

      return Response.json(voiceUrls);
    } catch (_error) {
      console.error(_error);
      return Response.json({ error: _error });
    }
  },
};
