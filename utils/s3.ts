import { S3Client } from "https://deno.land/x/s3_lite_client@0.6.1/mod.ts";
import config from "@/utils/config.ts";

const s3Client = new S3Client({
  endPoint: config.s3Endpoint as string,
  pathStyle: false,
  region: "EEUR",
  accessKey: config.s3AccessKey,
  secretKey: config.s3SecretKey,
});

export const uploadObject = (key: string, file: ReadableStream) => {
  const chunks = key.split("/");
  const filename = chunks[chunks.length - 1];
  try {
    return s3Client.putObject(key, file, {
      bucketName: "example",
      metadata: {
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Error", err);
  }
};

export const getFileUrl = (key: string) => {
  return `https://r2.securiwiser.com/${key}`;
};
