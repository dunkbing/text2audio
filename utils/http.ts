export function downloadFile(url: string) {
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  a.href = url;
  a.download = "true";

  a.click();

  document.body.removeChild(a);
}
