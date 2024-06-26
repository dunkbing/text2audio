import { formatNumber } from "@/utils/strings.ts";

export function TotalVoices(props: { total: number }) {
  const { total = 10000 } = props;
  return (
    <div
      id="about"
      class="flex flex-col items-center justify-center mt-2 px-5"
    >
      <p class="text-black text-xl font-semibold mb-4">
        Total paragraphs converted: {formatNumber(total)}
      </p>
    </div>
  );
}
