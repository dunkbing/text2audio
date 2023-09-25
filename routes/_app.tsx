import { AppProps } from "$fresh/server.ts";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

export default function App({ Component, url }: AppProps) {
  return (
    <div class="bg-gray-100">
      <div class="flex flex-col min-h-screen mx-auto w-2/3">
        <Header
          url={url}
        />
        <Component />
        <Footer url={url} />
      </div>
    </div>
  );
}
