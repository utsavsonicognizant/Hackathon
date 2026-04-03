/**
 * FILE LEVEL: First_test.ts (NavigationPage Class)
 * 
 * PURPOSE:
 * This file uses the "Page Object Model" (POM) design pattern. It's like a 
 * "Remote Control" for the Coursera website. Instead of writing complex 
 * code in our tests, we write simple functions here that do the work.
 */

import {Page, Locator} from '@playwright/test';
import {navLocators} from '../Locators/First_Navigate.ts';

export class NavigationPage
{
  // Step 1: Define the "Tools" we will use on the page
  page:Page;
  searchBox:Locator;
  dropdownOptions:string;
  ViewButton:Locator;
  firstCourses:Locator;

  /**
   * CONSTRUCTOR:
   * This is like "Setting up the remote control." It tells the class 
   * which page to control and where the buttons are.
   */
  constructor(page:Page){
    this.page=page;
    // Find the search box using its locator
    this.searchBox = page.locator(navLocators.searchBox);
    // Store the locator for dropdown options
    this.dropdownOptions = navLocators.dropdownOptions;
    // Find the "View" button by its role and name
    this.ViewButton = page.getByRole('button', { name: 'View' });
    // Find the main list of courses
    this.firstCourses = page.locator(navLocators.coursePage);
  }

  /**
   * FUNCTION: searchCourse
   * This function handles the entire search process.
   * 1. Go to the website
   * 2. Click the search box
   * 3. Type the course name
   * 4. Press Enter
   */
  async searchCourse(courseName:string){
    await this.page.goto('https://www.coursera.org/');
    await this.searchBox.click();
    await this.searchBox.fill(courseName);
    await this.searchBox.press('Enter');
  }

  /**
   * FUNCTION: applyFilter
   * This function helps us narrow down search results.
   * 1. Click the dropdown (like "Language" or "Level")
   * 2. Find the specific option (like "English" or "Beginner")
   * 3. Click the "View" button to apply the filter
   */
  async applyFilter(dropdown:string, filterOption:string)
  {
    // Click the dropdown menu using its Test ID
    await this.page.getByTestId(dropdown).click();
    // Find the specific option inside the dropdown and click it
    await this.page.locator(this.dropdownOptions).filter({ hasText: filterOption }).click();
    // Click the "View" button to see the filtered results
    await this.ViewButton.click();
  }

  /**
   * FUNCTION: getCourseDetails
   * This function extracts and prints information about the courses.
   * 1. Find the first set of courses
   * 2. Loop through each course card
   * 3. Print the Title, Rating, and Duration to the console
   */
  async getCourseDetails()
  {
    // Get the first group of courses found on the page
    const firstCourses = await this.firstCourses.first();
    // Get all individual course items (list items)
    const courses = await firstCourses.locator('li').all();
    console.log('Total courses found:', courses.length);
    
    let count = 1;
    // Loop through each course to extract its details
    for(const course of courses)
    {
      // Print the Title, Rating, and Duration of the course
      console.log('Course:', await course.locator(navLocators.courseTitle).textContent());
      console.log('Rating:', await course.locator(navLocators.courseRating).textContent());
      console.log('Duration:', await course.locator(navLocators.courseDuration).textContent());
      console.log('----------------------------------');

      // Step 4: Limit the output to only the first 2 courses for clarity
      if (count == 2) break; 
      count++;
    }
  }
}
