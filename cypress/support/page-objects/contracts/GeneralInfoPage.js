export class onGeneralInfo{
    static fillInContractName(contractName){
        cy.get('input[name="name"]').as('contractName').type(contractName)
        cy.get('@contractName').should('have.value', contractName)
    }

    static selectJobTitle(jobTitle){
        cy.get('input[name="jobTitle"]').as('jobTitle').click().type(jobTitle)
        cy.contains('p.suggestions-option', jobTitle).click()
        cy.get('@jobTitle').should('have.value', jobTitle)
    }

    static selectSeniorityLevel(seniority){
        cy.get('[data-qa="selector-seniority-level"]').click()
        cy.contains(seniority).click()
        cy.get('[data-qa="selector-seniority-level"]').find('div[class*="select__single-value"]').should('have.text', seniority)
    }

    static fillScopeOfWork(scopeOfWork){
        cy.get('textarea[name="scope"]').as('scopeOfWork').type(scopeOfWork)
        cy.get('@scopeOfWork').should('have.value', scopeOfWork)
    }

    static fillStartDateWithCurrentDateMinusOne(){
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate()-1)
        let currentDateMinusOne = currentDate.getDate()
        cy.get('div[name="effectiveDate"]').as('contractorStartDate').click()
        cy.get('button[class*="react-calendar__tile"]').contains(currentDateMinusOne).click()
        cy.get('@contractorStartDate').should('contain', currentDateMinusOne)
    }

    static submitData(){
        cy.get('button').contains('next').should('be.visible').click()
    }
}