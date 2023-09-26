import { AppProps } from "$fresh/server.ts";

import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

export default function App({ Component, url }: AppProps) {
  return (
    <div class="bg-gray-100">
      <div class="flex flex-col min-h-screen mx-auto sm:w-full md:w-2/3 lg:w-1/2">
        <Header
          url={url}
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
        <Component />
        <Footer url={url} />
      </div>
    </div>
  );
}
