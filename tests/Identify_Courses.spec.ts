/**
 * FILE LEVEL: coursera.spec.ts
 */

import { test, expect} from '@playwright/test';
import { DateTime } from 'luxon';
import { NavigationPage } from '../Pages/First_test.ts';
import { navLocators } from '../Locators/First_Navigate.ts';
import { CourseraHome } from '../Pages/Second_test.ts';
import { CampusPage } from '../Pages/Third_test.ts';
import { getValidFormData,getInvalidFormData } from '../utils/formData.ts';

/**
 * TEST SUITE: Coursera Automation Suite
 * This block groups all our Coursera tests together.
 */
test.describe('Coursera Automation Suite', () => {
  let timestamp: string;
  let i = 1;

  /**
   * HOOK: beforeAll
   * This runs ONCE before any tests start.
   * We use it to set a timestamp for our reports and screenshots.
   */
  test.beforeAll(async ({ browser }) => {
    // Get the current date and time in a nice format
    timestamp = DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss');
    console.log(`>>> Starting Test: ${timestamp}`);
  });

  /**
   * HOOK: beforeEach
   * This runs BEFORE EACH individual test.
   * We use it to log which test is starting.
   */
  test.beforeEach(async ({ browser }) => {
    console.log(`>>> Test: ${i} Started.`);
  });

  /**
   * HOOK: afterEach
   * This runs AFTER EACH individual test.
   * We use it to log that the test is done and increment our counter.
   */
  test.afterEach(async () => {  
    console.log(`>>> Test: ${i} Done closed.`);  
    i++;
  });  

  /**
   * TEST 1: Searching and Extracting Details
   * This test searches for "web development" courses, applies filters, 
   * and prints the details of the first two courses found.
   */
  test('Test 1:Searching and Extracting Details', { tag: ['@smoke','@search','@sanity'] }, async ({ page }) => {  
    // Step 1: Create a new "Remote Control" for navigation
    const navigation = new NavigationPage(page);  

    // Step 2: Search for "web development" courses
    await navigation.searchCourse('web development');  
    await page.screenshot({ path: `./screenshots/Searched Page_${timestamp}.png` });  


    // Step 3: Apply the "English" language filter
    await navigation.applyFilter(navLocators.languageDropdown, 'English');  

    // Step 4: Apply the "Beginner" level filter
    await navigation.applyFilter(navLocators.levelDropdown, 'Beginner');  
     
    // Step 5: Wait for 3 seconds for the results to load (for stability)
    await page.waitForTimeout(3000);  

    // Step 6: Extract and print the course details
    await navigation.getCourseDetails();  
    await page.screenshot({ path: `./screenshots/Applied filter page_${timestamp}.png` });  

  });  

  /**
   * TEST 2: Extract Language and Level counts
   * This test searches for "Language Learning" and prints the number 
   * of available languages and levels in the filters.
   */
  test('Test 2: Extract Language and Level counts', { tag: ['@extract','@regression','@sanity'] }, async ({ page }) => {

  const coursera = new CourseraHome(page);

  await coursera.goto();
  await coursera.search('Language Learning');

  await page.waitForLoadState('networkidle');

  const languages = await coursera.extractAllFilterCounts('Language');
  await page.screenshot({ path: `./screenshots/Language Search_${timestamp}.png` });  
  const levels = await coursera.extractAllFilterCounts('Level');

  console.log('Available Languages:', languages);
  console.log('Total Languages:', languages.length);

  console.log('Available Levels:', levels);
  console.log('Total Levels:', levels.length);

  expect(languages.length).toBeGreaterThan(0);
  expect(levels.length).toBeGreaterThan(0);
});


  /**
   * TEST 3: Verify Coursera Campus Form Validation
   * This test checks if the Coursera Campus contact form correctly 
   * validates an invalid email address and handles a successful submission.
   */
  test('Test 3: Verify Coursera Campus Form Validation', { tag: ['@form','@smoke','@regression'] }, async ({ page }) => {

  const campus = new CampusPage(page);

  // Navigate
  await campus.navigate();

  // ---------- INVALID EMAIL TEST ----------
  await test.step('Validate invalid email error', async () => {

    

    await campus.fillContactForm(getInvalidFormData());
    await campus.submitForm();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `./screenshots/Invalid Email${timestamp}.png` });  
  });

  // ---------- VALID EMAIL TEST ----------
  await test.step('Validate successful form submission', async () => {

    await page.reload();
    await page.waitForLoadState('networkidle');

    

    await campus.fillContactForm(getValidFormData());
    await campus.submitForm();
    await page.screenshot({ path: `./screenshots/Success_${timestamp}.png` });  


    
  });

});
});
