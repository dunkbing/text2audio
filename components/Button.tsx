import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement> & {
    colorMode?: "primary" | "secondary";
  },
) {
  const { colorMode = "primary" } = props;
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`px-3 py-2 rounded-md border(gray-500 2) active:bg-gray-300 disabled:(opacity-50 cursor-not-allowed) ${
        props.class ?? ""
      } ${
        colorMode === "primary"
          ? "bg-blue-700 hover:bg-blue-500 disabled:bg-blue-400"
          : "bg-green-700 hover:bg-green-500 disabled:bg-green-400"
      }`}
    />
  );
}
