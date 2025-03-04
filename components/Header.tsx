import { SITE_BAR_STYLES, SITE_NAME } from "@/utils/constants.ts";

export interface HeaderProps {
  /**
   * URL of the current page. This is used for highlighting the currently
   * active page in navigation.
   */
  url: URL;
}

export default function Header(_props: HeaderProps) {
  const NAV_ITEM = "text-green-900 underline px-1.5 py-4 sm:py-2";

  return (
    <header
      class={`${SITE_BAR_STYLES} flex-col sm:flex-row`}
    >
      <div class="flex justify-between items-center">
        <a href="/" class="shrink-0">
          <img
            src="/cover.png"
            alt={`${SITE_NAME} logo`}
            width={200}
          />
        </a>
      </div>
      <nav
        class={"font-semibold flex flex-col gap-x-1 divide-y divide-solid sm:flex sm:items-center sm:flex-row sm:divide-y-0"}
      >
        <a
          href="https://ftt-one.vercel.app/"
          class={NAV_ITEM}
          target="_blank"
        >
          Files to text
        </a>
        <a
          href="/api"
          class={NAV_ITEM}
        >
          API
        </a>
        <a
          href="https://tinyimg.cc/"
          class={NAV_ITEM}
          target={"_blank"}
        >
          TinyIMG
        </a>
      </nav>
    </header>
  );
}
