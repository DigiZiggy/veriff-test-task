import CheckButton from "./CheckButton";

describe('CheckButton', () => {
    it('renders check button', () => {
        cy.mount(<CheckButton setValue={cy.stub()}/>);
        cy.get('button').should('have.class', 'btn');
    });

    it('renders disabled check button', () => {
        cy.mount(<CheckButton disabled={true} setValue={cy.stub()}/>);
        cy.get('[data-testid="check-button"]').should('be.disabled');
    });
});
