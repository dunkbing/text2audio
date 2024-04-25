import { S3Client } from "@bradenmacdonald/s3-lite-client";
import config from "@/utils/config.ts";

let s3Client_: S3Client;

function getClient() {
  if (!s3Client_) {
    s3Client_ = new S3Client({
      endPoint: config.s3Endpoint as string,
      pathStyle: false,
      region: "EEUR",
      accessKey: config.s3AccessKey,
      secretKey: config.s3SecretKey,
    });
  }
  return s3Client_;
}

export const uploadObject = (key: string, file: ReadableStream) => {
  const chunks = key.split("/");
  const filename = chunks[chunks.length - 1];

  const s3Client = getClient();

  return s3Client.putObject(key, file, {
    bucketName: "text2audio",
    partSize: 6 * 1024 * 1024,
    metadata: {
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
};

export const getFileUrl = (key: string) => {
  return `${config.s3PublicEndpoint}/${key}`;
};
