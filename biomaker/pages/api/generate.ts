import { NextApiResponse, NextApiRequest } from "next";
import { OpenAIStreamPayload } from "../../interfaces/openai";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const config = {
  runtime: "edge",
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt not found." });
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
