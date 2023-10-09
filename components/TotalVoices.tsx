function formatNumber(number: number) {
  if (number >= 1000000) {
    return (number >= 2000000) ? Math.floor(number / 1000000) + "M+" : "1M+";
  } else if (number >= 1000) {
    return (number >= 2000) ? Math.floor(number / 1000) + "K+" : "1K+";
  }
  return number.toString();
}

export function TotalVoices(props: { total: number }) {
  const { total = 10000 } = props;
  return (
    <div
      id="about"
      class="flex flex-col items-center justify-center mt-5 px-5"
    >
      <p class="text-black text-xl font-semibold mb-4">
        Total paragraphs converted: {formatNumber(total)}
      </p>
    </div>
  );
}
