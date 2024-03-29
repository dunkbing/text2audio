import { PageProps } from "$fresh/server.ts";

import Head from "@/components/Head.tsx";
import FeedbackForm from "@/islands/FeedbackForm.tsx";

export default function (ctx: PageProps) {
  return (
    <div class="flex flex-col justify-center items-center">
      <Head href={ctx.url.href} title="Feedback">
        <link
          as="fetch"
          crossOrigin="anonymous"
          href={ctx.url.href}
          rel="preload"
        />
      </Head>
      <FeedbackForm />
    </div>
  );
}
