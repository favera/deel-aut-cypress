import onCompliance from "../../support/page-objects/contracts/CompliancePage"
import ContractType from "../../support/page-objects/contracts/ContractTypePage"
import onExtras from "../../support/page-objects/contracts/ExtrasPage"
import { onGeneralInfo } from "../../support/page-objects/contracts/GeneralInfoPage"
import onPaymentDetails from "../../support/page-objects/contracts/PaymentDetailsPage"
import SidebarPage from "../../support/page-objects/pages/SidebarPage"



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
        SidebarPage.clickOnCreateContract()
        ContractType.selectFixedRateType()
    })

    it('Should fill General Info form and press next button', ()=> {
        cy.fixture('contracts').then(contract =>{
            onGeneralInfo.fillInContractName(contractName)
            onGeneralInfo.selectJobTitle(contract.fixedRate.jobTitle)
            onGeneralInfo.selectSeniorityLevel(contract.fixedRate.seniority)
            onGeneralInfo.fillScopeOfWork(contract.fixedRate.scopeOfWork)
            onGeneralInfo.fillStartDateWithCurrentDateMinusOne()
            onGeneralInfo.submitData()
        })      
          
    })

    it('should fill payment details and click next button', ()=> {
        cy.fixture('contracts').then(contract => {
            onPaymentDetails.defineTheAmount(contract.fixedRate.amount)
            onPaymentDetails.selectCurrency(contract.fixedRate.currency)
            onPaymentDetails.selectPaymentCycle(contract.fixedRate.paymentCycle)
            onPaymentDetails.submitData()
        })
          
    })

    it('Should click the next button without modifiying the form', ()=>{
        cy.get('button[type="submit"]').should('be.visible').click()
    })

    it('Should add a special clause', ()=>{
        cy.fixture('contracts').then(contract => {
            onExtras.addSpecialClause(contract.fixedRate.specialClause)
            onExtras.submitData()
        })
        
    })

    it('Should select contractor residence and create a fixed rate contract', ()=>{
        cy.fixture('contracts').then(contract => {
            onCompliance.selectContractorTaxResidence(contract.fixedRate.country)
            onCompliance.selectState(contract.fixedRate.state)
            onCompliance.submitData()
        })  
    })

    it('Should display the contract created', ()=>{
        cy.get('div.page-content').find('h1').should('contain', contractName )
    })
})