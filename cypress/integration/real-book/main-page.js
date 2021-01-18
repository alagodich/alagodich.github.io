describe('Main Page', () => {
     it('should show list of songs', () => {
          cy.visit('http://localhost:4000/realbook.html');
          cy.get('.realbook .header').contains('Real Book');
          cy.get('.list').contains('500 Miles');

          cy.get('.right.menu input')
              .type('All of')
              .should('have.value', 'All of');
          cy.get('.list').contains('All Of Me');
          cy.get('.list').contains('All Of You');
          cy.get('.list').should('not.contain', '500 Miles');

          cy.get('.right.menu input')
              .type('All ofzxzxzxzxzx')
              .should('have.value', 'All ofAll ofzxzxzxzxzx');
          cy.get('.realbook').should('contain', 'Nothing found, try different search criteria.');

          cy.get('i[title="Clear filter"]').click();
          cy.get('.list').should('contain', '500 Miles');
          cy.get('.realbook').should('not.contain', 'Nothing found, try different search criteria.');
     });
});
