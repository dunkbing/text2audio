import { Handlers } from "$fresh/server.ts";

import config from "@/utils/config.ts";
import { Status } from "$std/http/http_status.ts";
import { createHttpError } from "$std/http/http_errors.ts";

async function cfRun(model: string, input: FormData) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${config.cfAccountID}/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${config.cfToken}` },
      method: "POST",
      body: input,
    },
  );
  const result = await response.json();
  return result;
}

export const handler: Handlers = {
  async POST(_req, _ctx) {
    try {
      const formData = await _req.formData();
      const audioFile = formData.get("audio") as File;

      if (!audioFile) {
        return Response.json({ error: "Missing audio file" });
      }
      console.log(audioFile.size, audioFile.name);
      const response = await cfRun("@cf/openai/whisper", formData);

      return Response.json({ ...response });
    } catch (_error) {
      console.error(_error);
      throw createHttpError(Status.InternalServerError, _error.message);
    }
  },
};
