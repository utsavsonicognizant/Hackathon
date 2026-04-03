import { Page, expect } from '@playwright/test';
import { CampusLocators } from '../Locators/Third_Navigate';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  instType: string;
  instName: string;
  jobRole: string;
  dept: string;
  needs: string;
  learners: string;
  country: string;
  state?: string;
};

export class CampusPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.coursera.org');
    await this.page.getByRole('link', { name: 'For Campus' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillContactForm(data: FormData) {
    await this.page.getByPlaceholder('First Name').fill(data.firstName);
    await this.page.getByPlaceholder('Last Name').fill(data.lastName);
    await this.page.getByPlaceholder('Work Email Address').fill(data.email);
    await this.page.getByPlaceholder('Phone').fill(data.phone);

    await this.page.getByLabel('Institution Type').selectOption(data.instType);
    await this.page.getByPlaceholder('Institution Name').fill(data.instName);
    await this.page.getByLabel('Job Role').selectOption(data.jobRole);
    await this.page.getByLabel('Department').selectOption(data.dept);
    await this.page.getByLabel('Which best describes your').selectOption(data.needs);
    await this.page.getByLabel('Expected number of learners').selectOption(data.learners);
    await this.page.getByLabel('Country').selectOption(data.country);

    if (data.state) {
      await this.page.getByLabel('State').selectOption(data.state);
    }
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async verifyEmailErrorVisible() {
    await expect(this.page.getByText('Must be valid email.')).toBeVisible();
  }
}