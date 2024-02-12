export function Promote() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
      <img
        src="/tinyimg.png"
        alt="Ad Image"
        className="h-24 object-cover"
      />
      <div className="px-4 pb-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Also check out tinyimg.cc!
        </h2>
        <p className="text-gray-600 mb-2">
          Compress your images with the best quality and compression ratio.
        </p>
        <a
          href="https://tinyimg.cc"
          target="_blank"
          className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Visit Now
        </a>
      </div>
    </div>
  );
}
