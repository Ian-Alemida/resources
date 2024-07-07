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

  const requisicao = {
    contents: [{ role: "user", parts }],
  };
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });
  console.log(
    "\n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Total entrada tokens - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n"
  );
  const totalTokensEntrada = await model.countTokens(requisicao);
  console.log(`Total tokens de entrada: ${totalTokensEntrada.totalTokens}`);
  console.log(
    " \n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Resultado gerado - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n"
  );
  const response = await result.response;
  const text = response.text();
  console.log(text);
  console.log(
    " \n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Total tokens gastos - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n "
  );
  const totalTokensSaida = await model.countTokens(text);
  console.log(`Total tokens de saida: ${totalTokensSaida.totalTokens}`);
}
