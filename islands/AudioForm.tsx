import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import IconMicrophone from "tabler_icons_tsx/microphone.tsx";

import { signal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import { Loader } from "@/components/Loader.tsx";

type FormProps = {
  uploadUrl: string;
};

type AsrResponse = {
  text: string;
  word_count: number;
  words: string[];
  vtt: string;
};

const filesSig = signal<string[]>([]);
const downloadSig = signal<boolean>(false);
const converting = signal(false);

const MAX_AUDIO_DURATION_SECONDS = 30;

function ensureValidFile(file: File) {
  return new Promise((resolve, reject) => {
    if (file && file.type.startsWith("audio/")) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.onloadedmetadata = () => {
        if (audio.duration > MAX_AUDIO_DURATION_SECONDS) {
          reject(
            `Audio duration exceeds ${MAX_AUDIO_DURATION_SECONDS} seconds. Please select a shorter audio file.`,
          );
        } else {
          resolve("");
        }
      };
    } else {
      reject("Please select a valid audio file.");
    }
  });
}

export default function AudioForm(props: FormProps) {
  const [file, setFile] = useState<File | null>(null);
  const transcribedTextRef = useRef<HTMLDivElement>(null);

  const handleFileChange: JSX.GenericEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    const target = event.target as HTMLInputElement;
    const selectedFiles = target?.files;
    if (!selectedFiles?.length) {
      return;
    }
    const selectedFile = selectedFiles[0];
    await ensureValidFile(selectedFile).then(() => setFile(selectedFile)).catch(
      alert,
    );
  };

  const handleDragOver: JSX.DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("bg-gray-300");
  };

  const handleDragLeave: JSX.DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("bg-gray-300");
  };

  const handleDrop: JSX.DragEventHandler<HTMLLabelElement> = async (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("bg-gray-300");

    const droppedFiles = event.dataTransfer?.files;
    if (!droppedFiles?.length) {
      return;
    }
    const droppedFile = droppedFiles[0];
    await ensureValidFile(droppedFile).then(() => setFile(droppedFile)).catch(
      alert,
    );
  };

  const submit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!file) return;

    converting.value = true;
    try {
      const formData = new FormData();
      formData.append("audio", file);

      const requestOptions: RequestInit = {
        method: "POST",
        body: formData,
      };

      const res = await fetch("/api/stt", requestOptions);
      if (res.ok) {
        const asr = (await res.json()).result as AsrResponse;
        console.log(asr.vtt);
        if (transcribedTextRef.current) {
          transcribedTextRef.current.textContent = asr.text;
        }

        // showSnackbar("Success");
      } else {
        // showSnackbar("Error");
      }
    } catch (error) {
      // showSnackbar(error.message);
    } finally {
      converting.value = false;
    }
  };

  const downloadAll = async () => {
    downloadSig.value = true;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "files": filesSig.value,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      body: raw,
    };

    try {
      const response = await fetch(
        "",
        requestOptions,
      );
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "images.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    } finally {
      downloadSig.value = false;
    }
  };

  return (
    <div class="w-full flex flex-col items-center space-y-1.5">
      <h1 class="text-green-800 text-2xl font-semibold">
        Speech to text (automatic speech recognition) free
      </h1>
      <span class="text-green-700 text-sm text-center">
        This tool is crafted to effortlessly transform your spoken words into
        written text. It boasts versatile recognition capabilities with support
        for a wide array of languages and their dialects.
      </span>
      <form
        class="flex flex-col mx-auto px-8 w-full items-center"
        method="POST"
        onSubmit={submit}
      >
        <label
          for="dropzone-file"
          class="block text-gray-700 font-bold mb-1 text-xl text-center"
        >
          Audio Files
        </label>
        <div className="flex items-center justify-center w-full px-3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 shadow-xl"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <IconMicrophone size={55} />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>{" "}
                or drop your audio files here
              </p>
              <p className="mb-2 text-xs text-gray-500">
                Upto {MAX_AUDIO_DURATION_SECONDS} seconds at a time
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept="audio/*"
            />
          </label>
        </div>
        <div class="my-2" />

        {file && (
          <>
            <h3 className="text-md font-semibold mb-2">Selected Audio:</h3>
            <audio controls className="w-2/3">
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio element.
            </audio>
          </>
        )}

        {converting.value && <Loader />}
        <div ref={transcribedTextRef} />

        <Button
          class="text-white font-semibold mt-1"
          disabled={converting.value}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
