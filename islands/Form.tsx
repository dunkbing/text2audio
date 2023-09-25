import { signal } from "@preact/signals";
import { useMemo, useState } from "preact/hooks";

type Voice = { url: string; text: string };

const text = signal("");
const language = signal("en-US");
const voices = signal<Voice[]>([]);

const languages = [
  {
    "text": "Afrikaans",
    "value": "af-ZA",
  },
  {
    "text": "Albanian",
    "value": "sq",
  },
  {
    "text": "Arabic",
    "value": "ar-AE",
  },
  {
    "text": "Armenian",
    "value": "hy",
  },
  {
    "text": "Bengali (Bangladesh)",
    "value": "bn-BD",
  },
  {
    "text": "Bengali (India)",
    "value": "bn-IN",
  },
  {
    "text": "Bosnian",
    "value": "bs",
  },
  {
    "text": "Burmese (Myanmar)",
    "value": "my",
  },
  {
    "text": "Catalan",
    "value": "ca-ES",
  },
  {
    "text": "Chinese",
    "value": "cmn-Hant-TW",
  },
  {
    "text": "Croatian",
    "value": "hr-HR",
  },
  {
    "text": "Czech",
    "value": "cs-CZ",
  },
  {
    "text": "Danish",
    "value": "da-DK",
  },
  {
    "text": "Dutch",
    "value": "nl-NL",
  },
  {
    "text": "English (Australia)",
    "value": "en-AU",
  },
  {
    "text": "English (United Kingdom)",
    "value": "en-GB",
  },
  {
    "text": "English (United States)",
    "value": "en-US",
  },
  {
    "text": "Esperanto",
    "value": "eo",
  },
  {
    "text": "Estonian",
    "value": "et",
  },
  {
    "text": "Filipino",
    "value": "fil-PH",
  },
  {
    "text": "Finnish",
    "value": "fi-FI",
  },
  {
    "text": "French",
    "value": "fr-FR",
  },
  {
    "text": "French (Canada)",
    "value": "fr-CA",
  },
  {
    "text": "German",
    "value": "de-DE",
  },
  {
    "text": "Greek",
    "value": "el-GR",
  },
  {
    "text": "Gujarati",
    "value": "gu",
  },
  {
    "text": "Hindi",
    "value": "hi-IN",
  },
  {
    "text": "Hungarian",
    "value": "hu-HU",
  },
  {
    "text": "Icelandic",
    "value": "is-IS",
  },
  {
    "text": "Indonesian",
    "value": "id-ID",
  },
  {
    "text": "Italian",
    "value": "it-IT",
  },
  {
    "text": "Japanese (Japan)",
    "value": "ja-JP",
  },
  {
    "text": "Kannada",
    "value": "kn",
  },
  {
    "text": "Khmer",
    "value": "km",
  },
  {
    "text": "Korean",
    "value": "ko-KR",
  },
  {
    "text": "Latin",
    "value": "la",
  },
  {
    "text": "Latvian",
    "value": "lv",
  },
  {
    "text": "Macedonian",
    "value": "mk",
  },
  {
    "text": "Malayalam",
    "value": "ml",
  },
  {
    "text": "Marathi",
    "value": "mr",
  },
  {
    "text": "Nepali",
    "value": "ne",
  },
  {
    "text": "Norwegian",
    "value": "nb-NO",
  },
  {
    "text": "Polish",
    "value": "pl-PL",
  },
  {
    "text": "Portuguese",
    "value": "pt-BR",
  },
  {
    "text": "Romanian",
    "value": "ro-RO",
  },
  {
    "text": "Russian",
    "value": "ru-RU",
  },
  {
    "text": "Serbian",
    "value": "sr-RS",
  },
  {
    "text": "Sinhala",
    "value": "si",
  },
  {
    "text": "Slovak",
    "value": "sk-SK",
  },
  {
    "text": "Spanish (Mexico)",
    "value": "es-MX",
  },
  {
    "text": "Spanish (Spain)",
    "value": "es-ES",
  },
  {
    "text": "Swahili",
    "value": "sw",
  },
  {
    "text": "Swedish",
    "value": "sv-SE",
  },
  {
    "text": "Tamil",
    "value": "ta",
  },
  {
    "text": "Telugu",
    "value": "te",
  },
  {
    "text": "Thai",
    "value": "th-TH",
  },
  {
    "text": "Turkish",
    "value": "tr-TR",
  },
  {
    "text": "Ukrainian",
    "value": "uk-UA",
  },
  {
    "text": "Urdu",
    "value": "ur",
  },
  {
    "text": "Vietnamese",
    "value": "vi-VN",
  },
  {
    "text": "Welsh",
    "value": "cy",
  },
];

const VoiceCard = (props: Voice) => {
  const audio = useMemo(() => new Audio(props.url), [props.url]);
  const [playing, setPlaying] = useState(false);

  audio.onpause = () => setPlaying(false);

  return (
    <div class="w-2/3 mx-auto mt-8 bg-white rounded-lg overflow-hidden shadow-lg">
      <div class="p-4">
        <p class="text-gray-700 text-center">
          {props.text}
        </p>
      </div>
      <div class="px-4 pb-4 flex justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
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
          class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
          onClick={() => {
            fetch(props.url)
              .then((response) => response.blob())
              .then((blob) => {
                const a = document.createElement("a");
                a.style.display = "none";
                document.body.appendChild(a);

                const url = window.URL.createObjectURL(blob);

                a.href = url;
                a.download = props.url.split("/").pop() as string;

                a.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default function () {
  return (
    <div class="flex flex-col mb-4 mx-auto p-8 mt-8 w-2/3 items-center">
      <div class="w-full">
        <div class="mb-4">
          <label for="text" class="block text-gray-700 font-bold mb-2">
            Text
          </label>
          <textarea
            id="text"
            name="text"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            rows={5}
            placeholder="Enter your text here"
            onInput={(e) => {
              // deno-lint-ignore no-explicit-any
              const value = (e.target as any).value;
              text.value = value;
            }}
          >
          </textarea>
        </div>
        <div class="mb-4">
          <label for="language" class="block text-gray-700 font-bold mb-2">
            Language
          </label>
          <select
            id="language"
            name="language"
            class="px-3 text-black py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              // deno-lint-ignore no-explicit-any
              const value = (e.target as any).value;
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
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
          onClick={async () => {
            const res = await fetch("/api/voices", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: text.value,
                language: language.value,
              }),
            });
            const voicesTmp = await res.json();
            if (Array.isArray(voicesTmp)) {
              voices.value = voicesTmp as Voice[];
            }
          }}
        >
          Submit
        </button>
      </div>
      <div class="mt-5" />
      {voices.value.length
        ? (
          <div class="mt-3">
            <h1 class="text-gray-700 font-bold">Voices ({language.value})</h1>
          </div>
        )
        : (
          <div class="justify-center mx-auto">
            <h1 class="text-gray-700 font-bold">No voices</h1>
          </div>
        )}
      {voices.value.map((v) => (
        <VoiceCard key={v.url} text={v.text} url={v.url} />
      ))}
    </div>
  );
}
