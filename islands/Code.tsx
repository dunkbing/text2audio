export default function Code(props: { code: string }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="bg-gray-200 text-white p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">Code:</span>
          <button
            className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
            onClick={() => navigator.clipboard.writeText(props.code)}
          >
            Copy
          </button>
        </div>
        <div className="overflow-x-auto">
          <pre id="code" className="text-gray-900 whitespace-pre-wrap">
            <code>{props.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
