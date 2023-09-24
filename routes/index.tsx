export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
      </div>
      <div class="max-w-xl mx-auto p-8 mt-8 bg-white rounded shadow-lg">
        <h1 class="text-2xl font-semibold mb-4">Text Translation</h1>
        <form>
          <div class="mb-4">
            <label for="text" class="block text-gray-700 font-medium mb-2">
              Input Text:
            </label>
            <textarea
              id="text"
              name="text"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={5}
              placeholder="Enter your text here"
            >
            </textarea>
          </div>
          <div class="mb-4">
            <label for="language" class="block text-gray-700 font-medium mb-2">
              Select Language:
            </label>
            <select
              id="language"
              name="language"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
          >
            Translate
          </button>
        </form>
      </div>
    </div>
  );
}
