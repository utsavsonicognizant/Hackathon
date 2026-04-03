/**
 * 📄 FILE LEVEL: Second_test.ts (CourseraHome Class)
 * 
 * PURPOSE:
 * This file is another "Remote Control" for the Coursera homepage. It's designed 
 * to handle common actions like searching and extracting filter counts.
 */

import { Page, Locator } from '@playwright/test';
import { CourseraLocators } from '../Locators/Second_Navigate';

export class CourseraHome {
  /**
   * 🏗️ CONSTRUCTOR:
   * This sets up the class with the Playwright 'page' object.
   * Think of it as "Opening the browser window" for this class to use.
   */
  constructor(private page: Page) {}

  /**
   * 🌐 FUNCTION: goto
   * This function navigates the browser to the Coursera homepage.
   * It's like typing the URL into the address bar.
   */
  async goto() {
    await this.page.goto('https://www.coursera.org/');
  }

  /**
   * 🔍 FUNCTION: search
   * This function handles the search process.
   * 1. Find the search input box by its placeholder text
   * 2. Type the search query (like "Language Learning")
   * 3. Press Enter to see the results
   */
  async search(query: string) {
    // Find the search input box using its placeholder text
    const input = this.page.getByPlaceholder(/What do you want to learn\?|Search or ask anything/);
    // Type the search query into the input box
    await input.fill(query);
    // Press the Enter key to submit the search
    await input.press('Enter');
  }

  /**
   * 📊 FUNCTION: extractAllFilterCounts
   * This function extracts all the options from a filter dropdown.
   * 1. Click the filter button (like "Language" or "Level")
   * 2. Find all the labels inside the dropdown
   * 3. Get the text for each label (like "English (100)", "Spanish (50)")
   * 4. Close the dropdown by pressing the Escape key
   */
  async extractAllFilterCounts(filterName: 'Language' | 'Level') {
    // Click the filter button by its name (e.g., "Language")
    await this.page.getByRole('button', { name: filterName, exact: true }).click();
    // Find all the labels for the filter options
    const options = this.page.locator(CourseraLocators.search.filterLabel);
    // Get the text for all the labels found
    const data = await options.allInnerTexts();
    const cleaned=data.map(item=> item.replace ('\n',' '))
    // Press the Escape key to close the filter dropdown
    await this.page.keyboard.press('Escape');
    // Return the list of filter options and their counts
    return cleaned;
  }
}
