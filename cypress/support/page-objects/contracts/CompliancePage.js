export default class onCompliance{
    static selectContractorTaxResidence(country){
        cy.get('div[data-qa="contractor-tax-residence"]').as('taxResidence').click()
        cy.contains(country).click()
        cy.get('@taxResidence').find('div[class*="select__single-value"]').should('have.text', country)
    }

    static selectState(state){
        cy.get('div[data-qa="contractor-tax-residence-province"]').as('state').click()
        cy.contains(state).click()
        cy.get('@state').find('div[class*="select__single-value"]').should('have.text', state)
    }

    static submitData(){
        cy.intercept('https://api-dev.letsdeel.com/contracts').as('postContracts')
        cy.contains('button', 'create contract').should('be.visible').click()
        cy.wait('@postContracts').its('response.statusCode').should('eq', 201)
    }
}