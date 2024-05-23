import { PageProps } from "$fresh/server.ts";

import Head from "@/components/Head.tsx";
import { SttDuration } from "@/components/SttDuration.tsx";
import { kv, sstStatsKey } from "@/utils/kv.ts";
import { FAQ } from "@/components/FAQ.tsx";
import { About } from "@/components/About.tsx";
import { HowToUse } from "@/components/HowToUse.tsx";
import AudioForm from "@/islands/AudioForm.tsx";

const sstStats = await kv.get(sstStatsKey);

export default function Stt(ctx: PageProps) {
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
      <AudioForm />
      <div id="container-6422c2dda22d1320506d5bf4dc3a7b94" />
      <SttDuration total={sstStats.value} />
      <HowToUse />
      <About />
      <FAQ />
    </div>
  );
}
