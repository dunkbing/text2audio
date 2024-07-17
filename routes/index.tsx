import { PageProps } from "$fresh/server.ts";

import Form from "../islands/TextForm.tsx";
import Head from "@/components/Head.tsx";
import { TotalVoices } from "@/components/TotalVoices.tsx";
import { kv, voicesEntryKey } from "@/utils/kv.ts";
import { FAQ } from "@/components/FAQ.tsx";
import { About } from "@/components/About.tsx";
import { HowToUse } from "@/components/HowToUse.tsx";

const voicesEntry = await kv.get(voicesEntryKey);

export default function Home(ctx: PageProps) {
  return (
    <div class="flex flex-col justify-center items-center">
      <Head href={ctx.url.href}>
        <link
          as="fetch"
          crossOrigin="anonymous"
          href={ctx.url.href}
          rel="preload"
        />
      </Head>
      <script
        type="text/javascript"
        src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
        data-name="bmc-button"
        data-slug="dangbinh48a"
        data-color="#FFDD00"
        data-emoji="☕"
        data-font="Cookie"
        data-text="Buy me a coffee"
        data-outline-color="#000000"
        data-font-color="#000000"
        data-coffee-color="#ffffff"
      />
      <Form />
      <script type="text/javascript">
        {`
atOptions = {
  'key' : '1de6d419f1cc48601813ef750bb3f332',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};
`}
      </script>
      <script
        type="text/javascript"
        src="//www.topcreativeformat.com/1de6d419f1cc48601813ef750bb3f332/invoke.js"
      >
      </script>
      <div id="container-6422c2dda22d1320506d5bf4dc3a7b94" />
      <TotalVoices total={voicesEntry.value} />
      <HowToUse />
      <About />
      <FAQ />
    </div>
  );
}
