export default class SidebarPage{
    static clickOnCreateContract(){
        cy.contains('a[href="/create"]', 'Create a Contract').click()
    }
}