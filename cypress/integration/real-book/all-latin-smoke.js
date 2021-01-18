describe('All jazz smoke', () => {
    it('should go through all latin charts and see no errors. Part 1', () => {
        openLatinPages(0, 100);
    });
    it('should go through all latin charts and see no errors, Part 2', () => {
        openLatinPages(101, 200);
    });
    it('should go through all latin charts and see no errors, Part 2', () => {
        openLatinPages(201, 300);
    });
    it('should go through all latin charts and see no errors, Part 2', () => {
        openLatinPages(301, 400);
    });
    it('should go through all latin charts and see no errors, Part 2', () => {
        openLatinPages(401, 510);
    });
});

function openLatinPages(start, end) {
    for (let i = start; i < end; i++) {
        cy.visit(`http://localhost:4000/realbook.html#/latin/${i}`, {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog');
                cy.stub(win.console, 'error').as('consoleError');
            }
        });

        cy.get('@consoleLog').should('not.be.called');
        cy.get('@consoleError').should('not.be.called');
    }
}
