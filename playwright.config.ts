/**
 * FILE LEVEL: playwright.config.ts
 * 
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * Pro Tip: Environment variables allow you to store sensitive data like passwords
 * or change settings without editing the code.
 */

/**
 * CONFIGURATION BLOCK:
 * This is where we define the global rules for our tests.
 */
export default defineConfig({
  // Step 1: Tell Playwright where our test files are located
  testDir: './tests',

  // Step 2: Decide if tests should run at the same time (Parallel)
  // We set this to 'false' to run them one by one, which is easier for beginners to track.
  fullyParallel: false,

  // Step 3: Safety check for CI (Continuous Integration)
  // This prevents us from accidentally running only one test in a professional environment.
  forbidOnly: !!process.env.CI,

  // Step 4: Handling Failures
  // If a test fails, we tell Playwright to try it again 2 more times to be sure it's a real bug.
  retries: 2,

  // Step 5: Managing "Workers"
  // Workers are like separate hands doing work. On CI, we use 1 to keep things stable.
  workers: process.env.CI ? 1 : undefined,

  /**
   * REPORTING:
   * How do we want to see the results?
   */
  reporter: [
    // A nice HTML page that you can open in your browser
    ['html', {
      outputFolder: 'playwright-report',
    }],

    // A simple line-by-line update in your terminal
    ['line'],

    // A professional "Allure" report for deep analysis (requires extra setup)
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }]
  ],

  timeout:100000,

  /**
   * SHARED SETTINGS:
   * These settings apply to every single test we run.
   */
  use: {
    // Step 6: Trace and Video
    // This is like a "Black Box" recorder. If a test fails, it records a video 
    // and a 'trace' (step-by-step log) so we can see exactly what went wrong.
    trace: 'retain-on-failure',
    video: 'on',
    // launchOptions:{
    //   slowMo:2000
    // }
  },

  /**
   * BROWSER PROJECTS:
   * Which browsers should we test on?
   */
  projects: [
    {
      // We are focusing on Google Chrome (Chromium) for this project
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Note: You can uncomment these to test on Firefox or Safari (Webkit)
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
