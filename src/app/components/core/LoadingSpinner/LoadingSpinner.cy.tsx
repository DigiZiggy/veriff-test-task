import LoadingSpinner from "./LoadingSpinner";

describe('LoadingSpinner', () => {
    it('renders loading spinner', () => {
        cy.mount(<LoadingSpinner />);
        cy.get('[data-testid="loading-spinner"]').should('have.class', 'spinner');
    });
});
