import { AppProps } from "$fresh/server.ts";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

export default function App({ Component, url }: AppProps) {
  return (
    <div class="light:bg-gray-900">
      <div class="flex flex-col min-h-screen mx-auto max-w-7xl w-full dark:text-white">
        <Header
          url={url}
        />
        <Component />
        <Footer url={url} />
      </div>
    </div>
  );
}
