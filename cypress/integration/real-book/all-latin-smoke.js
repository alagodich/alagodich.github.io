describe('All jazz smoke', () => {
    it('should go through all latin charts and see no errors', () => {
        for (let i = 0; i < 510; i++) {
            cy.visit(`http://localhost:4000/realbook.html#/latin/${i}`, {
                onBeforeLoad(win) {
                    cy.stub(win.console, 'log').as('consoleLog');
                    cy.stub(win.console, 'error').as('consoleError');
                }
            });

            cy.get('@consoleLog').should('not.be.called');
            cy.get('@consoleError').should('not.be.called');
        }
    });
});
