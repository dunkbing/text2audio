import { getFileName } from "@/utils/strings.ts";

export async function downloadFile(url: string) {
  const filename = getFileName(url);
  const response = await fetch(url);
  const blob = await response.blob();
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  const url_1 = window.URL.createObjectURL(blob);

  a.href = url_1;
  a.download = filename as string;

  a.click();

  window.URL.revokeObjectURL(url_1);
  document.body.removeChild(a);
}
