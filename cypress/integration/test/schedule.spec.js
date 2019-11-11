//  add users favorite team
describe('Check schedules', () => {
    it('Check if all teams are returning', () => {
        
       cy.visit('/schedules')
       cy.get('[href="/schedules/13"] > .MuiButtonBase-root').click()
       cy.url().should('include', '/schedules/13')
     
        
    })
})