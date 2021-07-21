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
Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'https://api-dev.letsdeel.com/login', 
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
            "totp": null,
            "recaptcha": null,
            "email": "testing.gacfv@gmail.com",
            "password": "#FutureNostalgia2021"
        },
      }).then(xhr => {
          window.localStorage.setItem('token', xhr.body.token)
      })
})
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
