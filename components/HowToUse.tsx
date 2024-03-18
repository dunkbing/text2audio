import IconCopy from "tabler_icons_tsx/copy.tsx";
import IconDownload from "tabler_icons_tsx/file-download.tsx";
import IconMicrophone from "tabler_icons_tsx/microphone.tsx";

export function HowToUse() {
  return (
    <div
      id="about"
      class="flex flex-col items-center justify-center mt-5 px-5"
    >
      <h2 class="text-black text-2xl font-semibold mb-4">
        Easy way to convert text to speech (TTS) free
      </h2>
      <div class="flex flex-col md:flex-row items-center space-x-5">
        <div class="flex flex-col items-center mt-2 space-y-1">
          <IconCopy size={60} />
          <h3 class="font-semibold uppercase text-xs">
            Input Text-to-Speech
          </h3>
          <p class="text-xs text-gray-700 text-justify">
            Adjust your speech to your liking with the pitch and speed controls.
            Speed up or slow down your speech and manage the volume to your
            preference.
          </p>
        </div>
        <div class="flex flex-col items-center mt-2 space-y-1">
          <IconMicrophone size={60} />
          <h3 class="font-semibold uppercase text-xs">
            Choose LANGUAGE
          </h3>
          <p class="text-xs text-gray-700 text-justify">
            Choose the language and the text reader of your choice for
            converting text to mp3. Personalize the volume and speed of the
            voice to suit your preference.
          </p>
        </div>
        <div class="flex flex-col items-center mt-2 space-y-1">
          <IconDownload size={60} />
          <h3 class="font-semibold uppercase text-xs">
            Convert &amp; Download MP3
          </h3>
          <p class="text-xs text-gray-700 text-justify">
            The conversion from text-to-speech is incredibly swift, with the
            output in mp3 format. You can immediately start downloading for your
            professional needs.
          </p>
        </div>
      </div>
    </div>
  );
}
