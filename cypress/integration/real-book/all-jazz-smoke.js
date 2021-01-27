describe('All jazz smoke', () => {
    it('should go through all jazz charts and see no errors, Part 1', () => {
        openJazzPages(0, 100);
    });
    it('should go through all jazz charts and see no errors, Part 2', () => {
        openJazzPages(101, 200);
    });
    it('should go through all jazz charts and see no errors, Part 3', () => {
        openJazzPages(201, 300);
    });
    it('should go through all jazz charts and see no errors, Part 4', () => {
        openJazzPages(301, 400);
    });
    it('should go through all jazz charts and see no errors, Part 5', () => {
        openJazzPages(401, 500);
    });
    it('should go through all jazz charts and see no errors, Part 6', () => {
        openJazzPages(501, 600);
    });
    it('should go through all jazz charts and see no errors, Part 7', () => {
        openJazzPages(601, 700);
    });
    it('should go through all jazz charts and see no errors, Part 8', () => {
        openJazzPages(701, 800);
    });
    it('should go through all jazz charts and see no errors, Part 9', () => {
        openJazzPages(801, 900);
    });
    it('should go through all jazz charts and see no errors, Part 10', () => {
        openJazzPages(901, 1000);
    });
    it('should go through all jazz charts and see no errors, Part 11', () => {
        openJazzPages(1001, 1100);
    });
    it('should go through all jazz charts and see no errors, Part 12', () => {
        openJazzPages(1002, 1200);
    });
    it('should go through all jazz charts and see no errors, Part 13', () => {
        openJazzPages(1003, 1300);
    });
    it('should go through all jazz charts and see no errors, Part 14', () => {
        openJazzPages(1004, 1408);
    });
});

function openJazzPages(start, end) {
    for (let i = start; i < end; i++) {
        cy.visit(`http://localhost:4000/realbook.html#/jazz/${i}`, {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog');
                cy.stub(win.console, 'error').as('consoleError');
            }
        });

        cy.get('@consoleLog').should('not.be.called');
        cy.get('@consoleError').should('not.be.called');
    }
}