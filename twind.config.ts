import { defineConfig, Preset } from "@twind/core";
import freshToaster from "fresh_toaster/preset.ts";

export default {
  ...defineConfig({
    presets: [
      freshToaster() as Preset,
    ],
  }),
  selfURL: import.meta.url,
};
