function currentDateMinusOne(){
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate()-1)
    return currentDate.getDate()
}

let contractName = `Contract Number ${Math.floor(Math.random() * 10)}`

describe('Creation of Fixed Rate contract', ()=>{
    before(function(){
        cy.login()
    })

    it('Should see a popup and closed it', ()=>{
        cy.visit('/')
        cy.get('[data-qa="-popup"]').should('be.visible')
        cy.get('button[data-qa="close"]').click()
    })

    it('Should click on sidebar in the menu Create a Contract and select Fixed Rate type', ()=>{
        cy.contains('a[href="/create"]', 'Create a Contract').click()
        cy.get("a[href*='/create/fixed']").as('fixedRate')
        cy.get('@fixedRate').should('be.visible').click()
    })

    it('Should fill General Info form and press next button', ()=> {
        
        cy.get('input[name="name"]').as('contractName').type(contractName)
        cy.get('@contractName').should('have.value', contractName)

        cy.get('input[name="jobTitle"]').as('jobTitle').click().type('Back')
        cy.contains('p.suggestions-option', 'Back-end Developer').click()
        cy.get('@jobTitle').should('have.value', 'Back-end Developer')
              
        cy.get('[data-qa="selector-seniority-level"]').click()
        cy.contains('Junior (Individual Contributor Level 1)').click()
        cy.get('[data-qa="selector-seniority-level"]').find('div[class*="select__single-value"]').should('have.text', 'Junior (Individual Contributor Level 1)')

        cy.get('textarea[name="scope"]').as('scopeOfWork').type('make a vuejs application')
        cy.get('@scopeOfWork').should('have.value', 'make a vuejs application')

        cy.get('div[name="effectiveDate"]').as('contractorStartDate').click()
        cy.get('button[class*="react-calendar__tile"]').contains(currentDateMinusOne()).click()
        cy.get('@contractorStartDate').should('contain', currentDateMinusOne())

        cy.get('button').contains('next').should('be.visible').click()   
    })

    it('should fill payment details and click next button', ()=> {
        
        cy.get('input[name="rate"]').as('howMuch').type('1000')
        cy.get('@howMuch').should('have.value', '1000')

        cy.get('div[data-qa="currency-select"]').as('currency').click().find('div[class*="select__menu-list"]').then(element =>{
            console.log(element)
            element[0].childNodes.forEach(selectItem => {
                if(selectItem.innerText === 'GBP - British Pound'){
                    cy.wrap(selectItem).click()
                }
            })
        })
        cy.get('@currency').find('div[class*=select__single-value]').should('have.text', 'GBP - British Pound')

        cy.get('div[data-qa="cycle-select"]').as('per').click()
        cy.contains('Week').click()
        cy.get('@per').find('div[class*=select__single-value]').should('have.text', 'Week')
        
        cy.get('button[type="submit"]').should('be.visible').click()
    })

    it('Should click the next button without modifiying the form', ()=>{
        cy.get('button[type="submit"]').should('be.visible').click()
    })

    it('Should add a special clause', ()=>{
        cy.get('[data-qa="special-clause-card"]').find('button').click()
        cy.get('[data-qa="special-clause-card"]').find('div.textarea-container').as('specialClause').type('Special clause for the contract')
        cy.get('@specialClause').find('textarea').should('have.value', 'Special clause for the contract')
        cy.contains('button', 'next').should('be.visible').click()
    })

    it('Should select contractor residence and create a fixed rate contract', ()=>{
        cy.get('div[data-qa="contractor-tax-residence"]').as('taxResidence').click()
        cy.contains('United States').click()
        cy.get('@taxResidence').find('div[class*="select__single-value"]').should('have.text', 'United States')

        cy.get('div[data-qa="contractor-tax-residence-province"]').as('state').click()
        cy.contains('Colorado').click()
        cy.get('@state').find('div[class*="select__single-value"]').should('have.text', 'Colorado')

        cy.intercept('https://api-dev.letsdeel.com/contracts').as('postContracts')
        cy.contains('button', 'create contract').should('be.visible').click()
        cy.wait('@postContracts').its('response.statusCode').should('eq', 201)

        cy.get('div.page-content').find('h1').should('contain', contractName )
    })
})