describe("Login Page", () => {
  before(() => {
    cy.visit("/");
  });

  it("Redirect to Login", () => {
    cy.location("pathname").should("eq", "/login");
  });

  it("Have a login button", () => {
    cy.get(".v-btn")
      .should("be.visible")
      .should("contain", "Login");
  });

  it("Have a input for token", () => {
    cy.get(".v-input")
      .should("be.visible")
      .should("contain", "Enter your Token");
  });

  it("Have button login disabled when token empty", () => {
    cy.get(".v-btn").should("have.class", "disabled");
  });

  it("Login don't work without input", () => {
    cy.get(".v-btn").click();
    cy.get(".v-input").should("contain", "Token is required");
  });

  it("Login work", () => {
    cy.get(".v-input").type("test");
    cy.get(".v-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("user-token")).to.eq("test");
      });
    cy.location("pathname").should("eq", "/");
  });
});
