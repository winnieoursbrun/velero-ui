describe("Schedules Page", () => {
  before(() => {
    cy.visit("/schedules");
    cy.get(".v-input").type("test");
    cy.get(".v-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("user-token")).to.eq("test");
      });
    cy.location("pathname").should("eq", "/");
    cy.visit("/schedules");
  });

  it("Toolbar visible", () => {
    cy.get(".v-toolbar").should("be.visible");
  });

  it("Search is visible", () => {
    cy.get(".v-card__title > .v-input").should("be.visible");
  });

  it("Search work", () => {
    cy.get(".v-card__title > .v-input").type("everything");
    cy.get("tbody").should("have.length", 1);
  });
});
