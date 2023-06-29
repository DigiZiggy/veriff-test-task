import App from "./App";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureMockStore();
const store = mockStore({});

describe('App', () => {
  it('has container and content', () => {
    cy.mount(<Provider store={store}>
      <App />
    </Provider>);
    cy.get('[class=container]').should('have.class', 'container');
    cy.get('[class=content]').should('have.class', 'content')
  });
});
