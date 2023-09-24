import {
  ACTIVE_LINK_STYLES,
  LINK_STYLES,
  SITE_BAR_STYLES,
  SITE_NAME,
} from "@/utils/constants.ts";
import IconX from "tabler_icons_tsx/x.tsx";
import IconMenu from "tabler_icons_tsx/menu-2.tsx";
import { cx } from "@twind/core";

export interface HeaderProps {
  /**
   * URL of the current page. This is used for highlighting the currently
   * active page in navigation.
   */
  url: URL;
}

export default function Header(props: HeaderProps) {
  const NAV_ITEM = "text-gray-800 px-3 py-4 sm:py-2";

  return (
    <header
      class={cx(
        SITE_BAR_STYLES,
        "flex-col sm:flex-row",
      )}
    >
      <input
        type="checkbox"
        id="nav-toggle"
        class="hidden [:checked&+*>:last-child>*>:first-child]:hidden [:checked&+*>:last-child>*>:last-child]:block checked:siblings:last-child:flex"
      />

      <div class="flex justify-between items-center">
        <a href="/" class="shrink-0">
          <img
            height="48"
            src="/cover.png"
            alt={SITE_NAME + " logo"}
            class="h-12"
          />
        </a>
        <div class="flex gap-4 items-center">
          <label
            tabIndex={0}
            class="sm:hidden"
            id="nav-toggle-label"
            htmlFor="nav-toggle"
          >
            <IconMenu class="w-6 h-6" />
            <IconX class="hidden w-6 h-6" />
          </label>
        </div>
      </div>
      <script>
        {`
            const navToggleLabel = document.getElementById('nav-toggle-label');
            navToggleLabel.addEventListener('keydown', () => {
              if (event.code === 'Space' || event.code === 'Enter') {
                navToggleLabel.click();
                event.preventDefault();
              }
            });
          `}
      </script>
      <nav
        class={"hidden flex-col gap-x-4 divide-y divide-solid sm:(flex items-center flex-row divide-y-0)"}
      >
        <a
          href="/about"
          class={NAV_ITEM}
        >
          About
        </a>
      </nav>
    </header>
  );
}
