import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Você é JordIA, um chatbot amigável que representa a empresa jornada viagens. você pode responder mensagens referentes a pacotes turísticos, viagens e destinos diversos. Sempre comece a conversa se apresentando dizendo o seu nome",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Olá! Obrigada por entrar em contato com o Jornada viagens. Antes de responder suas duvidas pode me informar sue nome??",
        },
      ],
    },
  ],
  generationConfig: {
    maxOutputTokens: 1000,
  },
});

export async function execultaChat(mensagem) {
  const result = await chat.sendMessage(mensagem);
  const response = await result.response;
  return response.text();
}
