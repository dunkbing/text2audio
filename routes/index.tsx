import { PageProps } from "$fresh/server.ts";

import Head from "@/components/Head.tsx";
import { About } from "@/components/About.tsx";
import Form from "@/islands/Form.tsx";
import { FAQ } from "@/components/FAQ.tsx";

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
      <FAQ />
      <About />
    </div>
  );
}
