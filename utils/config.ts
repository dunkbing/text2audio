export default {
  s3Endpoint: Deno.env.get("S3_ENDPOINT"),
  s3AccessKey: Deno.env.get("S3_ACCESS_KEY"),
  s3SecretKey: Deno.env.get("S3_SECRET_KEY"),
  teleBotToken: Deno.env.get("TELE_BOT_TOKEN"),
  teleChatID: Deno.env.get("TELE_CHAT_ID"),
};
