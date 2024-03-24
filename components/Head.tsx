import { Head as _Head } from "$fresh/runtime.ts";
import Meta, { type MetaProps } from "./Meta.tsx";
import { SITE_DESCRIPTION, SITE_NAME } from "@/utils/constants.ts";
import { ComponentChildren } from "preact";

export type HeadProps =
  & Partial<Omit<MetaProps, "href">>
  & Pick<MetaProps, "href">
  & {
    children?: ComponentChildren;
  };

export default function Head(props: HeadProps) {
  return (
    <_Head>
      <Meta
        title={props?.title ? `${props.title} ▲ ${SITE_NAME}` : SITE_NAME}
        description={props?.description ?? SITE_DESCRIPTION}
        href={props.href}
        imageUrl="/og.webp"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZJF7E4QKYV"
      />
      <script>
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-ZJF7E4QKYV');
`}
      </script>
      <script
        async
        data-cfasync="false"
        src="//pl21297783.profitablegatecpm.com/6422c2dda22d1320506d5bf4dc3a7b94/invoke.js"
      />
      {props.children}
    </_Head>
  );
}
