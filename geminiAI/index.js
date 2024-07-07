import { askQuestion } from "./question.js";
import { freeQuestion } from "./freeQuestion.js";
import { consultar } from "./consultar.js";
import { processaImagem } from "./analisarImagem.js";

async function principal() {
  const escolha = await askQuestion(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  3. Escolher destino a partir de uma imagem;
  \nOpção desejada: `);

  if (escolha === "1") {
    await freeQuestion();
  } else if (escolha === "2") {
    await consultar();
  } else if (escolha === "3") {
    const imagem = await askQuestion("\n informe o caminho da imagem: ");
    await processaImagem(imagem);
  } else {
    console.log("Escolha inválida.");
  }
}

principal();
