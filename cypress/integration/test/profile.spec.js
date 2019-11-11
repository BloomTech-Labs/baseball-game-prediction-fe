// head to Profile and take action


    describe('Profile page render', () =>{
        it('Login Successfull & rendered profile page' , () => {
          cy.visit('/profile')
        //   cy.login()
          cy.get('Button').contains('Add A Favorite Team').click()
          cy.url().should('include', '/favoriteTeam')
          cy.get('img')
          cy.get('button[class=cy-teams]').eq(9).click()
          cy.url().should('include', '/profile')
          cy.get('Button').contains('Add Teams To Follow').click()
          cy.url().should('include', '/addTeam')
          cy.get(':nth-child(4) > a > img').click()
      
        })
      })






 