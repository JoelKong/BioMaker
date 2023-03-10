import { OpenAIStreamPayload } from "../../interfaces/openai";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const config = {
  runtime: "edge",
};

async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}

async function handler(req: Request) {
  if (req.method === "POST") {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt not found", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
  }
}

export default handler;
