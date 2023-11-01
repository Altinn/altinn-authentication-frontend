describe('template spec', () => {
    /*
    it('passes', () => {
      cy.visit('https://example.cypress.io')
    });
    */
  
    // Dette virket, men bare i Electron, ikke i Chrome
    it("passes", () => {
      cy.visit('http://local.altinn.cloud/');
  
      cy.get("h1").contains("Welcome to Altinn App Local Testing");
      cy.get("button").contains("Proceed to app").click();
      cy.url().should("include", "/authfront/ui");
      cy.visit("http://local.altinn.cloud/authfront/ui/auth/overview");
    });
  
    /*
    it('passes', () => {
      cy.visit('http://local.altinn.cloud/authfront/ui/auth/overview')
    });
  
    */
  });