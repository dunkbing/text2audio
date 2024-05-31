export function splitText(text: string, chunkSize = 150) {
  if (!text || typeof text !== "string" || chunkSize <= 0) {
    return [];
  }

  // Remove empty lines and split by new line character
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  const chunks = [];

  for (const line of lines) {
    const wordsAndPunctuation = line.split(/(\.|\;|\,|\s+)/).filter((part) =>
      part.trim() !== ""
    );
    let currentChunk = "";

    for (const part of wordsAndPunctuation) {
      if ((currentChunk + " " + part).length <= chunkSize) {
        if (currentChunk.length > 0) {
          currentChunk += " "; // Add a space between chunks
        }
        currentChunk += part;
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = part;
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }
  }

  return chunks;
}

export function toHex(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export function truncateString(inputString: string, maxLength = 20) {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength);
  }
}

export function splitArray(array: Array<string>, size = 200) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function uniqFast(arr: Array<string>) {
  const seen: Record<string, number> = {};
  const out = [];
  const len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

export function getFileName(url: string) {
  return url.split("/").pop();
}

export function formatNumber(number: number) {
  // if (number >= 1000000) {
  //   return (number >= 2000000) ? Math.floor(number / 1000000) + "M+" : "1M+";
  // }
  return number.toLocaleString("en-US");
}
