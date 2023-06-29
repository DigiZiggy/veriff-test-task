import { mount } from 'cypress/react'

declare global {
    interface Window {
        Cypress?: Cypress.Cypress;
        store?: any;
    }
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
            dataCy(value: string): Chainable<JQuery<HTMLElement>>
        }
    }
}
