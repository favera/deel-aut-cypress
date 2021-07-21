export default class ContractType{
    static selectFixedRateType(){
        cy.get("a[href*='/create/fixed']").as('fixedRate')
        cy.get('@fixedRate').should('be.visible').click()
    }

    static selectPayAsYouGoType(){
        cy.get('a[href="/create/pay-as-you-go"]').as('payAsYouGo')
        cy.get('@payAsYouGo').should('be.visible').click()
    }
}