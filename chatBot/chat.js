import { chat, funcoes } from "./inicializarChat.js";
import {
  incorporarDocumentos,
  incorporarPergunta,
  leArquivos,
} from "./embedding.js";

// Definindo arquivos dentro do ambiente para alimentar os prompts
const arquivos = await leArquivos([
  "Pacotes_Argentina.txt",
  "Pacotes_EUA.txt",
  "Politicas.txt",
]);
// Definindo documentos usados pelo método embedding
const documentos = await incorporarDocumentos(arquivos);

export async function executaChat(mensagem) {
  console.log("Tamanho do histórico: " + (await chat.getHistory()).length);

  // Incorporando o método embedding na mensagem do usuário
  let docs = await incorporarPergunta(mensagem, documentos);
  let prompt =
    mensagem +
    " talvez esse trecho te ajude a formular a resposta: " +
    docs.text;
  console.log("---> " + prompt + " <---");
  const result = await chat.sendMessage(prompt);
  const response = await result.response;

  const content = response.candidates[0].content;

  const fc = content.parts[0].functionCall;
  const text = content.parts.map(({ text }) => text).join("");

  if (fc) {
    const { name, args } = fc;
    const fn = funcoes[name];
    if (!fn) {
      throw new Error(`Unknown function "${name}"`);
    }
    const fr = {
      functionResponse: {
        name,
        response: {
          name,
          content: funcoes[name](args),
        },
      },
    };

    console.log(fr);

    const request2 = [fr];
    const response2 = await chat.sendMessage(request2);
    const result2 = response2.response;
    return result2.text();
  } else if (text) {
    return text;
  }
}
