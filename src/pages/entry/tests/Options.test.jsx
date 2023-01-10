import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("exibi image para cada opcao do server", async () => {
  render(<Options optionType="scoops" />);

  /* achar a imagem */

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  /* confirmar o alt da imagem */
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Exibir imagem para cada cobertura do server", async () => {
  render(<Options optionType="toppings" />);

  /* achar a imagem, e o nao estar vazio o array*/
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  /* checar o alt das imagens */
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
