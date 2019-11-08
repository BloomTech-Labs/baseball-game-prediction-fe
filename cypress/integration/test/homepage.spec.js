
// Render Home Page
describe('Home page render', () =>{
  it('Successfully rendered Home page' , () => {

    cy.visit('/')

  })
})


//Check Login
describe('check init register page', () => {
  it('register new user', () => {
    cy.visit('/register')
    cy.get('input[id=username]').type('lizz')
    cy.get('input[id=password]').type('Hello')
    cy.get('input[id=confPassword]').type('Hello')
    cy.get('Button').contains('Create Account').click()
    cy.url().should('include', '/register')
  })
  
})


//Check Login
describe('check init login page', () => {
  it('check Login and its return', () => {
    cy.visit('/login')
    cy.get('input[id=username]').type('lizz')
    cy.get('input[id=password]').type(`${'Hello'}{enter}`)
    cy.get('Button').contains('Login').click() 
    cy.url().should('include', '/')
  })
  
})

