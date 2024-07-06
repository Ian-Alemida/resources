import { GoogleGenerativeAI } from "@google/generative-ai";
import { askQuestion } from "./question.js";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  let prompt = `Você é uma IA de chatbot integrada ao portfolio pessoal de Ian Almeida, seu nome é IA'n. Sua função é a de responder perguntas para possíveis recrutadores e pessoas que estejam acessando o site. você pode retirar as informações sobre ian almeida neste site: (https://devfollio.vercel.app/)... A primeira pergunta do usuário é: `;
  prompt += await askQuestion("faça uma pergunta: ");

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(prompt);
  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(text);
}

run();
