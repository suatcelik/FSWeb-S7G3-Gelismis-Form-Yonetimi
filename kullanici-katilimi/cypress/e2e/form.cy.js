// cypress/integration/isim_yazdir_spec.js

describe("isim_yazdir testi", () => {
  it("isim yazdırma testi", () => {
    const isim = "John";
    const email = "john@gmail.com";
    const sifre = "123456";

    // Sayfayı aç
    cy.visit("http://localhost:5173/");
    //isim
    cy.get("#form-isim").type(isim);
    //email
    cy.get("#form-email").type(email);
    //sifre
    cy.get("#f_sifre").type(sifre);

    it("Rol Seçimi Yapınız", () => {
      cy.get("[data-cy=yumurta-ebat-select]").select("Frontend");
      cy.get("#form-rol").click();
    });

    //checbox
    //cy.get("#form-checkbox").click();
    //cy.get("#form-checbox").should("be.checked");
    //cy.get("#form-isim").should("have.text", "Bu alan zorunludur");
    //cy.get("#form-email").should("have.text", "Bu alan zorunludur");
    //cy.get("#form-email").should("have.text", "Bu alan zorunludur");
    //cy.get('#kullanim-kosullari-hata').should('have.text', 'Kullanım koşullarını kabul etmelisiniz');
    //cy.get("#form-gonder").click();
  });
});
