import { AppProps } from "$fresh/server.ts";

import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

export default function App({ Component, url }: AppProps) {
  return (
    <div class="bg-gray-100 flex flex-col items-center">
      <div class="flex flex-col h-screen mx-auto sm:w-full md:w-2/3 lg:w-1/2">
        <Header
          url={url}
        />
        <Component />
      </div>
      <Footer url={url} />
    </div>
  );
}
