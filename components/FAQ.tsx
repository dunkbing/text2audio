export function FAQ() {
  return (
    <div
      id="faq"
      class="flex flex-col items-center justify-center mt-5 px-5"
    >
      <hr class="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700" />
      <h1 class="text-black text-2xl font-semibold mb-4">FAQ</h1>
      <div class="flex flex-col sm:px-8 lg:px-12 xl:px-32">
        <details>
          <summary class="py-2 outline-none cursor-pointer focus:underline text-center">
            What is Text2Audio?
          </summary>
          <div class="px-4 pb-4">
            <p class="text-center">
              Text2Audio is an online text-to-speech tool that enables you to
              convert text into audio files, which can be played or downloaded.
            </p>
          </div>
        </details>
        <details>
          <summary class="py-2 outline-none cursor-pointer focus:underline text-center">
            How to convert text to audio?
          </summary>
          <div class="px-4 pb-4">
            <p class="text-center">
              To convert text into audio files using Text2Audio, you need to
              enter the text first, then select the language (you can choose to
              split the text into smaller paragraphs), and finally perform the
              conversion.
            </p>
          </div>
        </details>
        <details>
          <summary class="py-2 outline-none cursor-pointer focus:underline text-center">
            Is it free to use?
          </summary>
          <div class="px-4 pb-4 space-y-2">
            <p class="text-center">
              Yes, forever
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
