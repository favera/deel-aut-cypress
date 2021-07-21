export default class onPaymentDetails{
    static defineTheAmount(amount){
        cy.get('input[name="rate"]').as('howMuch').type(amount)
        cy.get('@howMuch').should('have.value', amount)
    }

    static selectCurrency(currency){
        cy.get('div[data-qa="currency-select"]').as('currency').click().find('div[class*="select__menu-list"]').then(element =>{
            console.log(element)
            element[0].childNodes.forEach(selectItem => {
                if(selectItem.innerText === currency){
                    cy.wrap(selectItem).click()
                }
            })
        })
        cy.get('@currency').find('div[class*=select__single-value]').should('have.text', currency)
    }

    static selectPaymentCycle(cycle){
        cy.get('div[data-qa="cycle-select"]').as('per').click()
        cy.contains(cycle).click()
        cy.get('@per').find('div[class*=select__single-value]').should('have.text', cycle)
    }

    static submitData(){
        cy.get('button[type="submit"]').should('be.visible').click()
    }
}