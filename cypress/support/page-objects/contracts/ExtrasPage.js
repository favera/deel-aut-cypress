export default class onExtras{
    static addSpecialClause(clause){
        cy.get('[data-qa="special-clause-card"]').find('button').click()
        cy.get('[data-qa="special-clause-card"]').find('div.textarea-container').as('specialClause').type(clause)
        cy.get('@specialClause').find('textarea').should('have.value', clause)
    }

    static submitData(){
        cy.contains('button', 'next').should('be.visible').click()
    }
}