/// <reference types="cypress" />

const contato = {
	nome: "john kramer",
	email: "john-kramer@sawmovie.com",
	telefone: "123-456-7890",
};

describe("Testes para a home", () => {
	beforeEach(() => {
		cy.visit("https://agenda-contatos-react.vercel.app/");
	});

	it("Exclui todos os contatos salvos", () => {
		if (cy.$$(".contato").length > 0) {
			cy.get(".delete").click({ multiple: true });
		}
	});

	it("Adiciona um contato novo", () => {
		cy.get('[type="text"]').type(contato.nome);
		cy.get('[type="email"]').type(contato.email);
		cy.get("[type='tel']").type(contato.telefone);
		cy.get(".adicionar").click();

		cy.get("div.contato").should("have.length", 1);
	});

	it("Verifica a opção de alterar o dado salvando o resultado após a alteração", () => {
		cy.get("button.edit").first().click();
		cy.get("form").find("div").children().should("have.length", 2);

		cy.get('[type="text"]').should("have.value", contato.nome);
		cy.get('[type="email"]').should("have.value", contato.email);
		cy.get("[type='tel']").should("have.value", contato.telefone);

		cy.get("[type='text']").clear().type("Jigsaw");

		cy.get(".alterar").click();

		cy.get(".contato").first().find("li").first().should("have.text", "Jigsaw");

		cy.get("form").find("div").children().should("have.length", 1);
	});

	it("Verifica a opção de alterar o dado cancelando a edição", () => {
		cy.get("button.edit").first().click();
		cy.get("form").find("div").children().should("have.length", 2);

		cy.get('[type="text"]').should("have.value", "Gian Souza");

		cy.get(".cancelar").click();

		cy.get(".contato").first().find("li").first().should("have.text", "Gian Souza");

		cy.get("form").find("div").children().should("have.length", 1);
	});
});
