import { signal } from "@preact/signals";
import { useMemo, useRef, useState } from "preact/hooks";

import { Button } from "@/components/Button.tsx";
import { Loader } from "@/components/Loader.tsx";
import { downloadFile } from "@/utils/http.ts";
import { splitText } from "@/utils/strings.ts";
import { languages2 } from "@/utils/constants.ts";

type Audio = { url: string; text: string; index: number };

const AudioCard = (props: Audio) => {
  const audio = useMemo(() => new Audio(props.url), [props.url]);
  const [playing, setPlaying] = useState(false);

  audio.onpause = () => setPlaying(false);

  return (
    <div class="w-2/3 mx-auto bg-white rounded-lg overflow-hidden shadow-lg mb-2">
      <div class="p-4">
        <p class="text-gray-700 text-center">
          {props.index}. {props.text}
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
          class="text-white font-semibold"
          colorMode="secondary"
          onClick={() => downloadFile(props.url, String(props.index))}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

const splitParagraph = signal(false);
const speed = signal("0.6");
const audios = signal<Audio[]>([]);
const converting = signal(false);

const showSnackbar = (text: string, err = false) => {
  const x = document.getElementById("snackbar");
  if (!x) return;
  x.innerHTML = text;
  x.className = "show";
  if (err) {
    x.className = "show red";
  }
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2000);
};

export default function Form() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <form
        class="flex flex-col my-4 mx-auto px-8 w-full items-center"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          const text = textAreaRef.current?.value.trim();
          if (!text) return;
          const language = selectRef.current?.value;

          converting.value = true;
          try {
            const res = await fetch("/api/audio", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paragraphs: splitText(text),
                language,
                splitParagraph: splitParagraph.value,
                speed: speed.value,
              }),
            });
            if (res.ok) {
              const voicesTmp = await res.json();
              if (Array.isArray(voicesTmp)) {
                audios.value = (voicesTmp as Audio[]).filter((v) =>
                  v.text && v.url
                );
              }
              showSnackbar("Success");
            } else {
              showSnackbar("Error");
            }
          } catch (error) {
            showSnackbar(error.message);
          } finally {
            converting.value = false;
          }
        }}
      >
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
            ref={textAreaRef}
            class="w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 text-black shadow-xl"
            rows={10}
            placeholder="Enter your text here..."
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="language"
            class="block text-gray-700 font-bold mb-2 text-xl text-center"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            ref={selectRef}
            class="px-3 text-black py-2 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500"
          >
            {Object.entries(languages2).map(([k, v]) => (
              <option
                key={k}
                value={k}
                selected={k === "en-US"}
              >
                {v}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-4 flex flex-row items-center space-x-2">
          <label
            for="speed"
            class="block text-gray-700 font-bold text-xl text-center"
          >
            Read Speed ({speed.value})
          </label>
          <input
            id="speed"
            name="speed"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={(e) => speed.value = e.currentTarget.value}
          />
        </div>
        <div class="flex items-center mb-4">
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
          disabled={converting.value}
          type="submit"
        >
          Submit
        </Button>
        <div class="mt-4" />
        <h1 class="text-gray-700 font-bold">
          {audios.value.length ? "Audio" : "No audio"}
        </h1>
      </form>
      {converting.value ? <Loader /> : (
        <>
          {audios.value.length > 1
            ? (
              <Button
                class="text-white font-semibold mb-2"
                colorMode="secondary"
                onClick={() =>
                  audios.value.map((v, i) =>
                    downloadFile(v.url, String(i + 1)).catch((err) =>
                      showSnackbar(err)
                    )
                  )}
              >
                Download All
              </Button>
            )
            : null}
          {audios.value.map((v, i) => (
            <AudioCard key={i} text={v.text} url={v.url} index={i + 1} />
          ))}
        </>
      )}
      <div id="snackbar" />
    </>
  );
}
