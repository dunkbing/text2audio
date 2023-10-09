import Code from "./Code.tsx";

export default function API(props: { baseUrl: string }) {
  const sampleResponse = [{
    url: "https://example.com/audio.mp3",
    text: "Hello, world!",
  }];

  return (
    <div class="flex flex-col items-center justify-center px-5">
      <div class="max-w-2xl mx-auto p-8 bg-white rounded shadow-lg">
        <h1 class="text-2xl font-semibold mb-4">Text2Audio API Instructions</h1>

        <p class="mb-4">
          Welcome to the Text2Audio API! Follow the instructions below to
          convert text to audio using our API.
        </p>

        <h2 class="text-xl font-semibold mb-2">1. Make a Request</h2>
        <p class="mb-2">
          Use the following <b>curl</b>{" "}
          command to make a sample request to convert text to audio:
        </p>

        <Code
          code={`curl -X POST -H "Content-Type: application/json" -d '{"language": "en-US", "paragraphs": "test paragraph", "splitParagraph": true}' ${props.baseUrl}/api/audio`}
        />

        <h2 className="text-xl font-semibold mb-2">2. Response</h2>
        <p className="mb-2">
          A successful response will be an array of objects like this:
        </p>

        <Code code={JSON.stringify(sampleResponse, null, 2)} />

        <p className="mt-4">
          Each object in the array contains a URL and the corresponding text.
        </p>
      </div>
    </div>
  );
}
