Cypress.Commands.add('login', () => {
    cy.visit('/login')
    cy.get('input[id=username]').type('lizz')
    cy.get('input[id=password]').type(`${'Hello'}{enter}`)
    cy.get('Button').contains('Login').click() 
    cy.url().should('include', '/')
})
