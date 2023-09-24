import { PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";

export default function Home(ctx: PageProps) {
  return (
    <div class="flex flex-col justify-center items-center">
      <Head href={ctx.url.href}>
        <link
          as="fetch"
          crossOrigin="anonymous"
          href={ctx.url.href}
          rel="preload"
        />
      </Head>
      <form class="mx-auto p-8 mt-8 w-2/3">
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
          >
            <option value="af-ZA">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="ar-AE">Arabic</option>
            <option value="hy">Armenian</option>
            <option value="bn-BD">Bengali (Bangladesh)</option>
            <option value="bn-IN">Bengali (India)</option>
            <option value="bs">Bosnian</option>
            <option value="my">Burmese (Myanmar)</option>
            <option value="ca-ES">Catalan</option>
            <option value="cmn-Hant-TW">Chinese</option>
            <option value="hr-HR">Croatian</option>
            <option value="cs-CZ">Czech</option>
            <option value="da-DK">Danish</option>
            <option value="nl-NL">Dutch</option>
            <option value="en-AU">English (Australia)</option>
            <option value="en-GB">English (United Kingdom)</option>
            <option selected value="en-US">English (United States)</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="fil-PH">Filipino</option>
            <option value="fi-FI">Finnish</option>
            <option value="fr-FR">French</option>
            <option value="fr-CA">French (Canada)</option>
            <option value="de-DE">German</option>
            <option value="el-GR">Greek</option>
            <option value="gu">Gujarati</option>
            <option value="hi-IN">Hindi</option>
            <option value="hu-HU">Hungarian</option>
            <option value="is-IS">Icelandic</option>
            <option value="id-ID">Indonesian</option>
            <option value="it-IT">Italian</option>
            <option value="ja-JP">Japanese (Japan)</option>
            <option value="kn">Kannada</option>
            <option value="km">Khmer</option>
            <option value="ko-KR">Korean</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian</option>
            <option value="mk">Macedonian</option>
            <option value="ml">Malayalam</option>
            <option value="mr">Marathi</option>
            <option value="ne">Nepali</option>
            <option value="nb-NO">Norwegian</option>
            <option value="pl-PL">Polish</option>
            <option value="pt-BR">Portuguese</option>
            <option value="ro-RO">Romanian</option>
            <option value="ru-RU">Russian</option>
            <option value="sr-RS">Serbian</option>
            <option value="si">Sinhala</option>
            <option value="sk-SK">Slovak</option>
            <option value="es-MX">Spanish (Mexico)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="sw">Swahili</option>
            <option value="sv-SE">Swedish</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="th-TH">Thai</option>
            <option value="tr-TR">Turkish</option>
            <option value="uk-UA">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="vi-VN">Vietnamese</option>
            <option value="cy">Welsh</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
