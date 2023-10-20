import { HandlerContext } from "$fresh/server.ts";
import { TelegramBot } from "https://deno.land/x/telegram_bot_api@0.4.0/mod.ts";
import config from "@/utils/config.ts";

const bot = new TelegramBot(config.teleBotToken as string);

type FeedbackData = {
  subject: string;
  message: string;
};

export const handler = {
  async POST(req: Request, _ctx: HandlerContext): Promise<Response> {
    console.log(config);
    const { subject, message } = (await req.json()) as FeedbackData;
    const text = [
      "Text2Audio Feedback",
      "---------------",
      subject,
      "---------------",
      message,
    ].join("\n");
    void bot
      .sendMessage({
        chat_id: config.teleChatID as string,
        text,
      })
      .catch((err) => console.error("Send tele message error:", err));

    return new Response(JSON.stringify({ message: "ok" }));
  },
};
