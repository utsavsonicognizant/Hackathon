/**
 * FILE LEVEL: Second_Navigate.ts
 * 
 * PURPOSE:
 * This file contains the locators for our second test scenario.
 */

export const CourseraLocators = {
  // Step 1: Locators for the main homepage
  home: {
    // The placeholder text inside the search input box
    searchInput: 'What do you want to learn?'
  },

  // Step 2: Locators for the search results page
  search: {
    // The main container for all search results
    resultsList: '[data-testid="search-results-list"]',

    // The individual course cards that appear in the list
    courseCard: '.cds-ProductCard-content',

    // The labels for checkboxes and radio buttons (like Language or Level)
    filterLabel: '.cds-checkboxAndRadio-labelContent'
  }
};
