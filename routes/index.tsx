import { PageProps } from "$fresh/server.ts";

import Form from "@/islands/Form.tsx";
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
      <Form />
      <div id="container-6422c2dda22d1320506d5bf4dc3a7b94" />
      <TotalVoices total={voicesEntry.value} />
      <HowToUse />
      <About />
      <FAQ />
    </div>
  );
}
