export default {
  s3Endpoint: Deno.env.get("S3_ENDPOINT"),
  s3PublicEndpoint: Deno.env.get("S3_PUBLIC_ENDPOINT"),
  s3AccessKey: Deno.env.get("S3_ACCESS_KEY"),
  s3SecretKey: Deno.env.get("S3_SECRET_KEY"),
  teleBotToken: Deno.env.get("TELE_BOT_TOKEN"),
  teleChatID: Deno.env.get("TELE_CHAT_ID"),
  cfAccountID: Deno.env.get("CF_ACCOUNT_ID"),
  cfToken: Deno.env.get("CF_TOKEN"),
};
