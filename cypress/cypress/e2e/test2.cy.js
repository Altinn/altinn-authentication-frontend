describe('Autentisering Frontend 2', () => {
  
    beforeEach( () => {
        // hver it-test må gå via knapp i Alinn App Local Testing
        cy.visit('http://local.altinn.cloud/');
        cy.get("button").contains("Proceed to app").click();
        
    });

    /*
    it("accesses the React app through Altinn App Local Testing", () => {
      cy.visit('http://local.altinn.cloud/');
      cy.get("h1").contains("Welcome to Altinn App Local Testing");
      cy.get("button").contains("Proceed to app").click();
      cy.url().should("include", "/authfront/ui");
    });
    */

    // establish before-each pattern
    it("finds the main Overviewpage", () => {
      cy.visit("http://local.altinn.cloud/authfront/ui/auth/overview");
      cy.get("h1").contains("Systembrukere");

      cy.get("button").contains("Opprett ny systembruker").click();
      cy.url().should("include", "/auth/creation");

    });

  
  });