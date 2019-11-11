describe('Testing Redux', () => {
    it('has expected state on load', () => {
        cy.visit('/')
        cy.window().its('store').invoke('getState')
        })
     
})