describe('Bookmarks Component Functionality', () => {
  beforeEach(() => {
    // Mock the login API response
    cy.intercept('POST', 'https://akil-backend.onrender.com/login', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          accessToken: 'mockAccessToken',
        },
      },
    }).as('mockLogin');

    // Mock the bookmarks API response
    cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
      statusCode: 200,
      body: {
        data: [
          {
            eventID: '1',
            logoUrl: 'https://example.com/logoA.png',
            title: 'Event A',
            orgName: 'Org A',
            dateBookmarked: '2024-08-12T00:00:00Z',
            opType: 'inPerson',
          },
          {
            eventID: '2',
            logoUrl: 'https://example.com/logoB.png',
            title: 'Event B',
            orgName: 'Org B',
            dateBookmarked: '2024-08-11T00:00:00Z',
            opType: 'virtual',
          },
        ],
      },
    }).as('getBookmarks');

    // Set the session cookie manually
    cy.setCookie('next-auth.session-token', 'mockAccessToken');

    // Visit the bookmarks page
    cy.visit('http://localhost:3000/bookmarks', { failOnStatusCode: false });
    cy.wait('@getBookmarks'); // Wait for the bookmarks API call
  });

  it('should display all bookmark items correctly', () => {
    // Check if each bookmark item is displayed
    cy.get('[data-testid^="bookmark-item-"]').each(($el) => {
      cy.wrap($el).should('be.visible');
    });
  });

  it('should display correct bookmark icon state', () => {
    // Check if the bookmark icons have the correct initial state
    cy.get('[data-testid^="bookmark-icon-"]').each(($el) => {
      cy.wrap($el).find('svg').should('have.class', 'text-yellow-500'); // Check for yellow color
    });
  });

  it('should toggle bookmark icon state when clicked resulting in deletion', () => {
    // Click the bookmark icon to remove the bookmark
    cy.get('[data-testid^="bookmark-item-"]').first().invoke('attr', 'data-testid').then((bookmarkId) => {
      if (bookmarkId) {
        cy.get(`[data-testid="bookmark-icon-${bookmarkId.split('-').pop()}"]`).click();

        cy.get(`[data-testid="${bookmarkId}"]`).should('not.exist');
      } else {
        throw new Error('bookmarkId is undefined');
      }
    });
  });

  it('should remove the item from the list after unbookmarking', () => {
    cy.get('[data-testid^="bookmark-item-"]').first().invoke('attr', 'data-testid').then((bookmarkId) => {
      if (bookmarkId) {
        cy.get(`[data-testid="bookmark-icon-${bookmarkId.split('-').pop()}"]`).click();

        cy.get(`[data-testid="${bookmarkId}"]`).should('not.exist');
      } else {
        throw new Error('bookmarkId is undefined');
      }
    });
  });

  it('should display the correct date format for each bookmarked item', () => {
    // Check the date format in each bookmark item
    cy.get('[data-testid="bookmark-date"]').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /\w{3} \d{1,2}, \d{4}/); // Expecting a format like "Aug 12, 2024"
    });
  });
});
