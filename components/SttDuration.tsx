import { formatNumber } from "@/utils/strings.ts";

export function SttDuration(props: { total: number }) {
  const { total = 10000 } = props;
  return (
    <div
      id="about"
      class="flex flex-col items-center justify-center mt-2 px-5"
    >
      <p class="text-black text-xl font-semibold mb-4">
        Total duration converted: {formatNumber(total)}s
      </p>
    </div>
  );
}
