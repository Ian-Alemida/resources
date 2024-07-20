import {
  GoogleGenerativeAI,
  FunctionDeclarationSchemaType,
} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
//faz a chamada a API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const funcoes = {
  // Função para calcular a taxa de juros, recebendo o valor
  taxaJurosParcelamento: ({ value }) => {
    const meses = typeof value === "string" ? parseInt(value) : value;
    if (meses <= 6) {
      return 3;
    } else if (meses <= 12) {
      return 5;
    } else if (meses <= 24) {
      return 7;
    }
  },
};

// Ferramentas sugeridas pelo Google para ajudar no desenvolvimento
const tools = [
  {
    // Método do Google para utilizar funções criadas pelo desenvolvedor juntamente com a API do Gemini, passando alguns parâmetros
    functionDeclarations: [
      {
        name: "taxaJurosParcelamento",
        description:
          "Retorna a taxa de juros para parcelamento baseado na quantidade de meses",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            value: { type: FunctionDeclarationSchemaType.NUMBER },
          },
          required: ["value"],
        },
      },
    ],
  },
];

// Chama o  modelo utilizando a chamada a API realizada anteriormente
const model = genAI.getGenerativeModel(
  { model: "gemini-1.0-pro", tools },
  { apiVersion: "v1beta" }
); // recebe como parâmetro o modelo do Gemini e outras funções disponibilizadas pelo Google
let chat;

function inicializarChat() {
  // Inicializa o chat passando  um histórico de conversa para guiar as próximas ações do chatbot
  chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Você é JorIA, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenham relação com viagens.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Olá! Obrigado por entrar em contato com o Jornada Viagens. Antes de começar a responder sobre suas dúvidas, preciso do seu nome e endereço de e-mail.",
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
}

export { inicializarChat, funcoes, chat };
