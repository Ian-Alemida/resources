import { setModel } from "./model.js";
import { askQuestion } from "./question.js";
import dotenv from "dotenv";
dotenv.config();

const model = await setModel("gemini-1.5-flash-latest");

async function run() {
  const categorias = await askQuestion(
    "Me fale as categorias que deseja visualizar sobre um determinado destino: "
  );
  const prompt = await askQuestion(
    "Me fale sobre o destino que deseja conhecer: "
  );

  const parts = [
    {
      text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não possui relação com viagem e turismo, informe que não poderá responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam em formato de lista com marcadores e sempre devem conter apenas as categorias que forem solicitadas no momento da pergunta.\n\nAlguns exemplos de categorias são: características, localização, cultura, pontos turísticos, culinária, clima, dicas, como chegar e curiosidades.",
    },
    { text: "input: me fale sobre o bairro do flamengo, no Rio de Janeiro" },
    {
      text: "output: **Bairro do Flamengo, Rio de Janeiro**\n\n* **Características:**\n    * Bairro nobre e residencial\n    * Conhecido por sua orla e parques\n    * Coração financeiro da cidade\n* **Localização:**\n    * Zona Sul do Rio de Janeiro\n    * Limita-se com as praias de Copacabana, Botafogo e Glória\n* **Cultura:**\n    * Sede do Museu de Arte Moderna (MAM) e da Marina da Glória\n    * Abriga o Parque do Flamengo, um dos maiores parques urbanos do país\n* **Pontos Turísticos:**\n    * Orla do Flamengo (anel viário com ciclovia e vista panorâmica)\n    * Museu de Arte Moderna (MAM)\n    * Marina da Glória (e palco do Reveillon)\n    * Parque do Flamengo\n    * Morro da Viúva (com vista para o Pão de Açúcar)\n* **Culinária:**\n    * Diversos restaurantes e bares na orla e no Parque do Flamengo\n    * Opções gastronômicas variadas, de frutos do mar a comida internacional",
    },
    { text: `input: me fale sobre ${categorias} o destino ${prompt}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
  });
  const response = await result.response;
  const text = response.text();
  console.log(parts[3]);
  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(text);
}

run();
