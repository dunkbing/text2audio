import { PageProps } from "$fresh/server.ts";

import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

export default function App({ Component, url }: PageProps) {
  return (
    <div class="bg-gray-100 flex flex-col items-center min-h-screen">
      <div class="flex flex-col mx-auto sm:w-full md:w-3/4 lg:w-1/2">
        <Header
          url={url}
        />
        <Component />
      </div>
      <Footer url={url} />
    </div>
  );
}
