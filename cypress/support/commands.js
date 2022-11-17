// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ({ firstname, lastname, email, phone_number, help_message }) => {
  cy.get('#firstName')
    .type(firstname)

  cy.get('#lastName')
    .type(lastname)

  cy.get('#email')
    .type(email)

  cy.get('#phone')
    .type(phone_number)

  cy.get('#open-text-area')
    .type(help_message, { delay: 0 })

  cy.contains('button', 'Enviar').click()

})

Cypress.Commands.add('fillFirstNameLastNameEmailFields', ({ firstname, lastname, email, help_message }) => {
  cy.get('#firstName')
    .type(firstname)

  cy.get('#lastName')
    .type(lastname)

  cy.get('#email')
    .type(email)

})