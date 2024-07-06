import { setModel } from "./model.js";
import { askQuestion } from "./question.js";
import dotenv from "dotenv";
dotenv.config();

const model = await setModel("gemini-1.5-flash-latest");

export async function freeQuestion() {
  const prompt = await askQuestion(
    "Me faça uma pergunta sobre um determinado destino: "
  );

  const parts = [
    { text: "Você é o chatbot de um site que vende pacotes de viagem." },
    { text: `input: ${prompt}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
