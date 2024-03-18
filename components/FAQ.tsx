export function FAQ() {
  return (
    <div
      id="faq"
      class="flex flex-col items-center justify-center mt-5 px-5"
    >
      <hr class="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700" />
      <h2 class="text-black text-2xl font-semibold mb-4">FAQ</h2>
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
              To convert text into audio (mp3 files) using Text2Audio, you need
              to enter the text first (or drag your text file into the text
              box), then select the language (you can choose to split the text
              into smaller paragraphs), and finally perform the conversion.
            </p>
          </div>
        </details>
        <details>
          <summary class="py-2 outline-none cursor-pointer focus:underline text-center">
            What are the uses of this?
          </summary>
          <div class="px-4 pb-4 space-y-2">
            <ul class="list-disc">
              <li>
                Provide tts (text-to-speech) functionality for individuals with
                visual impairments or reading difficulties.
              </li>
              <li>
                Develop interactive story applications where the text is
                narrated based on user choices.
              </li>
              <li>
                Assist users in learning the correct pronunciation of words in
                different languages.
              </li>
              <li>
                Turn written notes or memos into spoken messages for easy
                listening.
              </li>
              <li>
                Create instructional videos for training purposes within
                organizations.
              </li>
              ...
            </ul>
          </div>
        </details>
        <details>
          <summary class="py-2 outline-none cursor-pointer focus:underline text-center">
            Is it free to use?
          </summary>
          <div class="px-4 pb-4 space-y-2">
            <p class="text-center">
              Certainly, the application is completely free, with no charges,
              plans, or quotas.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
