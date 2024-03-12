import { PageProps } from "$fresh/server.ts";

import Form from "@/islands/Form.tsx";
import Head from "@/components/Head.tsx";
import { TotalVoices } from "@/components/TotalVoices.tsx";
import { kv, voicesEntryKey } from "@/utils/kv.ts";
import { Promote } from "@/components/Promote.tsx";

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
      <TotalVoices total={voicesEntry.value} />
      <Promote />
    </div>
  );
}
