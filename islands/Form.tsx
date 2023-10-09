import { signal } from "@preact/signals";
import { useMemo, useState } from "preact/hooks";
import ToastContext from "fresh_toaster/contexts/toastContext.tsx";
import Toaster from "fresh_toaster/components/toaster.tsx";
import { useToaster } from "fresh_toaster/hooks/index.tsx";

import { Button } from "../components/Button.tsx";
import { Loader } from "@/components/Loader.tsx";
import { downloadFile } from "@/utils/http.ts";
import { splitText } from "@/utils/strings.ts";
import { languages } from "@/utils/constants.ts";

type Audio = { url: string; text: string };

const VoiceCard = (props: Audio & { key?: string | number }) => {
  const audio = useMemo(() => new Audio(props.url), [props.url]);
  const [playing, setPlaying] = useState(false);

  audio.onpause = () => setPlaying(false);

  return (
    <div class="w-2/3 mx-auto bg-white rounded-lg overflow-hidden shadow-lg mb-2">
      <div class="p-4">
        <p class="text-gray-700 text-center">
          {props.text}
        </p>
      </div>
      <div class="px-4 pb-4 flex justify-center">
        <Button
          class="text-white font-semibold"
          onClick={() => {
            if (playing) {
              setPlaying(false);
              audio.pause();
            } else {
              setPlaying(true);
              audio.play();
            }
          }}
        >
          {playing ? "Pause" : "Play"}
        </Button>
        <div class="w-5" />
        <Button
          class="bg-green-400 hover:bg-green-500 text-white font-semibold"
          onClick={() => downloadFile(props.url, `${props.key}.mp3`)}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

const text = signal("");
const language = signal("en-US");
const splitParagraph = signal(true);
const audios = signal<Audio[]>([]);
const converting = signal(false);

export default function Form() {
  const [toasts, toaster] = useToaster();
  return (
    <div class="flex flex-col mb-4 mx-auto px-8 w-full items-center">
      <span class="text-green-700 text-sm text-center">
        This tool divides long text into smaller, readable sections while
        keeping words intact. It automatically handles line breaks and
        punctuation to maintain readability.
      </span>
      <div class="my-4 w-3/4">
        <label
          for="text"
          class="block text-gray-700 font-bold mb-2 text-xl text-center"
        >
          Text
        </label>
        <textarea
          id="text"
          name="text"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
          rows={10}
          placeholder="Enter your text here"
          onInput={(e) => {
            const value = e.currentTarget.value;
            text.value = value;
          }}
        />
      </div>
      <div class="mb-6">
        <label
          for="language"
          class="block text-gray-700 font-bold mb-2 text-xl text-center"
        >
          Language
        </label>
        <select
          id="language"
          name="language"
          class="px-3 text-black py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => {
            const value = e.currentTarget.value;
            language.value = value;
          }}
        >
          {languages.map((l) => (
            <option
              key={l.value}
              value={l.value}
              selected={l.value === "en-US"}
            >
              {l.text}
            </option>
          ))}
        </select>
      </div>
      <div class="flex items-center mb-6">
        <input
          checked={splitParagraph.value}
          id="green-checkbox"
          type="checkbox"
          class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
          onChange={(e) => splitParagraph.value = e.currentTarget.checked}
        />
        <label
          for="green-checkbox"
          class="ml-2 text-sm font-medium text-gray-900"
        >
          Split Paragraph
        </label>
      </div>
      <Button
        class="text-white font-semibold"
        disabled={converting.value || !text.value}
        type="submit"
        onClick={async () => {
          converting.value = true;
          try {
            const res = await fetch("/api/audio", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paragraphs: splitText(text.value),
                language: language.value,
                splitParagraph: splitParagraph.value,
              }),
            });
            const voicesTmp = await res.json();
            if (Array.isArray(voicesTmp)) {
              audios.value = (voicesTmp as Audio[]).filter((v) =>
                v.text && v.url
              );
            }
            toaster.success("Success");
          } catch (error) {
            toaster.error(error.message);
          } finally {
            converting.value = false;
          }
        }}
      >
        Submit
      </Button>
      <div class="mt-4" />
      <h1 class="text-gray-700 font-bold mb-4">
        {audios.value.length ? `Audio (${language.value})` : "No audio"}
      </h1>
      {converting.value ? <Loader /> : (
        <>
          {audios.value.length > 1
            ? (
              <Button
                class="bg-green-400 hover:bg-green-500 text-white font-semibold mb-2"
                onClick={() =>
                  audios.value.map((v, i) =>
                    downloadFile(v.url, `${i}.mp3`).catch((err) =>
                      toaster.error(err)
                    )
                  )}
              >
                Download All
              </Button>
            )
            : null}
          {audios.value.map((v, i) => (
            <VoiceCard key={i} text={v.text} url={v.url} />
          ))}
        </>
      )}
      <ToastContext.Provider value={toasts.value}>
        <Toaster position="top-right" />
      </ToastContext.Provider>
    </div>
  );
}
