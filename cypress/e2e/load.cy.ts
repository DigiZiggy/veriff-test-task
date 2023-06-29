describe("App", function() {
  it("should load without crashing", function() {
    cy.visit("http://localhost:8080");
  });
  it("should have the right initial state", function() {
    cy.window()
        .its("store")
        .invoke("getState")
        .should("deep.equal", {
          data: undefined,
          error: undefined,
          loaded: false,
          showSuccess: false
        });
  });
});