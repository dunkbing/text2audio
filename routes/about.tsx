import { PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";

export default function (ctx: PageProps) {
  return (
    <>
      <Head href={ctx.url.href} />
      <div class="flex flex-col items-center justify-center mt-5">
        <h1 class="text-black text-2xl font-semibold mb-4">About</h1>
        <div class="max-w-xl text-left text-black">
          <p class="text-lg mb-3">
            Text2Audio generates MP3 audio files from text and offers the option
            to either download them or play them directly in your web browser.
            It utilizes Google's text-to-speech API for this purpose.

            {
              /* <a
              class="underline text-green-500"
              href="https://withcabin.com/public/LT8F6bLEigzi"
              target="_blank"
            >
              public dashboard
            </a> */
            }
          </p>
          <p class="text-lg">
            Initially, Text2Audio was developed as a personal tool to generate
            audio for my TikTok video. However, it has since grown in popularity
            and is now used by thousands of individuals for various applications
            and needs.
          </p>
        </div>
      </div>
      <script async defer src="https://scripts.withcabin.com/hello.js" />
    </>
  );
}
