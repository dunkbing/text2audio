import { JSX } from "preact";
import { useMemo, useRef, useState } from "preact/hooks";
import { signal } from "@preact/signals";
import SrtParser2 from "srt-parser-2";

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
        <button
          class="btn btn-accent btn-sm text-white font-semibold"
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
        </button>
        <div class="w-5" />
        <button
          class="btn btn-sm btn-info text-white font-semibold"
          onClick={() => downloadFile(props.url, String(props.index))}
        >
          Download
        </button>
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
  const [file, setFile] = useState<File | null>();

  const [isDragging, setIsDragging] = useState(false);

  const handleDrop: JSX.DragEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file_ = e.dataTransfer?.files[0];
    setFile(file_);
    const reader = new FileReader();

    reader.onload = (e) => {
      if (textAreaRef.current) {
        textAreaRef.current.value = e.target?.result as string;
      }
    };

    reader.readAsText(file_ as Blob);
  };

  const handleDragOver: JSX.DragEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave: JSX.DragEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let text = textAreaRef.current?.value.trim();
    if (!text) return;

    const language = selectRef.current?.value;
    converting.value = true;

    if (file?.name?.endsWith(".srt")) {
      const parser = new SrtParser2();
      const srtArray = parser.fromSrt(text);
      text = srtArray.map(({ text }) => text).join("\n");
    }

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
          audios.value = (voicesTmp as Audio[]).filter((v) => v.text && v.url);
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
  };

  const textAreaClass =
    `w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-blue-700 text-black shadow-xl ${
      isDragging
        ? "border-dashed border-blue-700 bg-blue-100"
        : "border-gray-700"
    }`;

  return (
    <div class="w-full flex flex-col items-center space-y-2">
      <h1 class="text-green-800 text-2xl font-semibold">
        Text to speech (tts) free
      </h1>
      <form
        class="flex flex-col mx-auto px-8 w-full items-center space-y-3"
        method="POST"
        onSubmit={submit}
      >
        <span class="text-green-700 text-sm text-center">
          This tool divides long text into smaller, readable sections while
          keeping words intact. It automatically handles line breaks and
          punctuation to maintain readability.
        </span>
        <div class="my-1 w-3/4">
          <textarea
            id="text"
            name="text"
            ref={textAreaRef}
            className={textAreaClass}
            rows={9}
            placeholder="Enter your text, or drop a text file here to see its content..."
            required
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          />
        </div>
        <div class="mb-3">
          <label
            for="language"
            class="block text-gray-700 font-bold mb-1  text-xl text-center"
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
        <div class="mb-2 flex flex-row items-center space-x-2">
          <label
            for="speed"
            class="block text-gray-700 font-bold text-sm text-center"
          >
            Speed ({speed.value})
          </label>
          <input
            id="speed"
            name="speed"
            className="range range-xs w-44"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={(e) => speed.value = e.currentTarget.value}
          />
        </div>
        <div class="flex items-center mb-2">
          <input
            checked={splitParagraph.value}
            id="split-paragraph"
            type="checkbox"
            class="toggle toggle-success"
            onChange={(e) => splitParagraph.value = e.currentTarget.checked}
          />
          <label
            for="split-paragraph"
            class="ml-2 text-sm font-medium text-gray-900"
          >
            Split Paragraph
          </label>
        </div>
        <button
          class="btn btn-success text-white font-semibold"
          disabled={converting.value}
          type="submit"
        >
          Submit
        </button>
        <h2 class="text-gray-700 font-bold">
          {audios.value.length ? "Audio" : "No audio"}
        </h2>
      </form>
      {converting.value && <Loader />}
      {audios.value.length > 1
        ? (
          <button
            class="btn btn-info text-white font-semibold mb-2"
            onClick={() =>
              audios.value.map((v, i) =>
                downloadFile(v.url, String(i + 1)).catch((err) =>
                  showSnackbar(err)
                )
              )}
          >
            Download All
          </button>
        )
        : null}
      {audios.value.map((v, i) => (
        <AudioCard key={v.url} text={v.text} url={v.url} index={i + 1} />
      ))}
      <div id="snackbar" />
    </div>
  );
}
