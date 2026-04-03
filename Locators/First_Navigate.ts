/**
 * FILE LEVEL: First_Navigate.ts
 * 
 * PURPOSE:
 * This file contains the locators for our first test scenario.
 */

export const navLocators = {
  // Step 1: The search box where we type course names
  searchBox: '#search-autocomplete-input',

  // Step 2: The dropdown menus for filtering results
  languageDropdown: 'filter-dropdown-language',
  levelDropdown: 'filter-dropdown-productDifficultyLevel',

  // Step 3: The labels for the checkboxes inside the dropdowns
  dropdownOptions: 'span.cds-checkboxAndRadio-labelContent',

  // Step 4: The list that contains all the course results
  coursePage: 'ul.cds-9',

  // Step 5: Specific parts of each course card (Title, Rating, Duration)
  courseTitle: '.cds-CommonCard-title',
  courseRating: '.cds-RatingStat-meter span',
  courseDuration: '.cds-CommonCard-metadata'
}
