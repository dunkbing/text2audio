export function About() {
  return (
    <div id="about" class="flex flex-col items-center justify-center mt-5">
      <hr class="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700" />
      <h1 class="text-black text-2xl font-semibold mb-4">About</h1>
      <div class="max-w-xl text-left text-black">
        <p class="text-lg mb-3">
          Text2Audio generates MP3 audio files from text and offers the option
          to either download them or play them directly in your web browser. It
          utilizes Google's text-to-speech API for this purpose.
        </p>
        <p class="text-lg">
          Initially, Text2Audio was developed as a personal tool to generate
          audio for my TikTok video. However, it has since grown in popularity
          and is now used by thousands of individuals for various applications
          and needs.
        </p>
      </div>
    </div>
  );
}