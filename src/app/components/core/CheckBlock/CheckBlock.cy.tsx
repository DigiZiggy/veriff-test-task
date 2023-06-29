import CheckBlock from "./CheckBlock";
import {BOOLEAN} from "app/store/checks/types";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureMockStore();
const store = mockStore({});

const check = {
    id: "aaa",
    priority: 3,
    description: "This is the question",
    value: BOOLEAN.YES
}

describe('CheckBlock', () => {
    it('renders check block', () => {
        cy.mount(<Provider store={store}>
            <CheckBlock check={check}
                        index={0}
                        isFocused={false}
                        setFocusedIndex={cy.stub()}
                        setValueById={cy.stub()}/>
        </Provider>);
        cy.get('[data-testid="check-block"]').should('have.class', 'block');
    });

    it('renders focused check block', () => {
        cy.mount(<Provider store={store}>
            <CheckBlock check={check}
                        index={1}
                        isFocused={true}
                        setFocusedIndex={cy.stub()}
                        setValueById={cy.stub()}/>
        </Provider>);
        cy.get('[data-testid="check-block"]').should('have.class', 'focused');
    });

    it('renders disabled check block', () => {
        cy.mount(<Provider store={store}>
            <CheckBlock check={{
                            ...check,
                            disabled: true
                        }}
                        index={2}
                        isFocused={false}
                        setFocusedIndex={cy.stub()}
                        setValueById={cy.stub()}/>
        </Provider>);
        cy.get('[data-testid="check-block"]').should('have.class', 'disabled');
    });
});
