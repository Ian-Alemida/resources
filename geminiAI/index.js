import { askQuestion } from "./question.js";
import { freeQuestion } from "./freeQuestion.js";
import { consultar } from "./consultar.js";

async function principal() {
  const escolha = await askQuestion(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  \nOpção desejada: `);

  if (escolha === "1") {
    await freeQuestion();
  } else if (escolha === "2") {
    await consultar();
  } else {
    console.log("Escolha inválida.");
  }
}

principal();
