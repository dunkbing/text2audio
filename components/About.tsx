export function About() {
  return (
    <div
      id="about"
      class="flex flex-col items-center justify-center mt-5 px-5"
    >
      <h2 class="text-black text-2xl font-semibold mb-4">About</h2>
      <div class="max-w-xl text-left text-black">
        <p class="text-lg mb-3 text-center">
          Text2Audio generates MP3 audio files from text and offers the option
          to either download them or play them directly in your web browser. It
          utilizes Google's text-to-speech API for this purpose. Just enter or
          paste the text you want to listen to, and it will read it aloud for
          you.
        </p>
        <p class="text-lg text-center">
          Initially, Text2Audio was developed as a personal tool to generate
          audio for my TikTok video. However, it has since grown in popularity
          and is now used by thousands of individuals for various applications
          and needs.
        </p>
      </div>
    </div>
  );
}
