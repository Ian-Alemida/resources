import { chat } from "./inicializarChat.js";

export async function execultaChat(mensagem) {
  const result = await chat.sendMessage(mensagem);
  const response = await result.response;
  return response.text();
}
