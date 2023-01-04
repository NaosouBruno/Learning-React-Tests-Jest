import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
/* Testar se o checkbox começa não checked e o button desabilitado */
test("Condições iniciais", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});
/* User Event sempre retorna uma promise, logo a função é assincrona  */
test("Checkbox ativar button no primeiro click e desabilitar no segundo", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responde quando acontecer um hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  /* Primeiro testar se o popover iniciar "escondido" */
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  /* Segundo testar se o popover aparece quando tiver hover */
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  /* Terceiro testar se o popover some quando o mouse sai */
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
