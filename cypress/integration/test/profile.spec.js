// head to Profile and take action
describe('Profile page render', () =>{
    it('Login Successfull & rendered profile page' , () => {
  
      cy.visit('/profile')
      cy.get('Button').contains('Add A Favorite Team').click()
      cy.url().should('include', '/favoriteTeam')
  
    })
  })

 // add users favorite team
  describe('check returning team data', () => {
      it('all teams display', () => {
        
          cy.get('img')
          cy.get('button[id=cy-teams]').eq(9).click()
          cy.url().should('include', '/profile')

       
          
      })
  })

//   describe('Follow Team >', () => {
//       it( 'Follow New Team', () => {

//       cy.get('Button').contains('Add Teams To Follow').click()

//       })
//   })