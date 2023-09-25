export function splitParagraph(text: string, chunkSize = 150) {
  if (!text || typeof text !== "string" || chunkSize <= 0) {
    return [];
  }

  // Remove empty lines and split by new line character
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  const chunks = [];

  for (const line of lines) {
    const words = line.split(" ");
    let currentChunk = "";

    for (const word of words) {
      if ((currentChunk + " " + word).length <= chunkSize) {
        if (currentChunk.length > 0) {
          currentChunk += " ";
        }
        currentChunk += word;
      } else {
        // Split the chunk based on punctuation if it exceeds the chunk size
        const punctuationSplit = currentChunk.split(/([.,;])/);
        currentChunk = "";

        for (const part of punctuationSplit) {
          if ((currentChunk + part).length <= chunkSize) {
            if (currentChunk.length > 0) {
              currentChunk += " ";
            }
            currentChunk += part;
          } else {
            chunks.push(currentChunk);
            currentChunk = part;
          }
        }
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
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
