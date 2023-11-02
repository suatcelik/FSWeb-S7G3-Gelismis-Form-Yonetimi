describe("Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("form testleri", () => {
    cy.get("#name-validation")
      .should("be.visible")
      .should("have.text", "İsim alanı boş bırakılamaz!");

    nameInput.type("ornek urun 1");

    cy.get("#name-validation").should("be.hidden");
  });
});
