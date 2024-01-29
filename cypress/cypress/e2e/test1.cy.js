describe('Autentisering Frontend', () => {
  
    // Dette virket, men bare i Electron, ikke i Chrome
    it("finds the main Overviewpage", () => {
      cy.visit('http://local.altinn.cloud/');
  
      cy.get("h1").contains("Welcome to Altinn App Local Testing");
      cy.get("button").contains("Proceed to app").click();
      cy.url().should("include", "/authfront/ui");
      cy.visit("http://local.altinn.cloud/authfront/ui/auth/overview");
    });

  
  });