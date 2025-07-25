import { Page,expect } from '@playwright/test';
import { BaseElement } from './baseElement';

export class AngularPracticePage {
  private base: BaseElement;

  constructor(private page: Page) {
    this.base = new BaseElement(page);
  }

  async navigate() {
    await this.page.goto('https://rahulshettyacademy.com/angularpractice/');
  }

  async fillUserForm(details: {
    name: string;
    email: string;
    password: string;
    gender: string;
    employmentStatus: 'Student' | 'Employed' | 'Entrepreneur';
    dob: string;
  }) {
    await this.base.setValue('textbox', 'Name', details.name);
    await this.base.setValue('textbox', 'Email', details.email);
    await this.base.setValue('textbox', 'Password', details.password);
    await this.base.setValue('checkbox', 'Check me out if you Love IceCreams', '');
    await this.base.setValue('dropdown', 'Gender', details.gender);
    await this.base.setValue('radio', details.employmentStatus, '');
    await this.page.locator('input[name="bday"]').fill(details.dob);
    await this.base.click('button', 'Submit');
  }

  async verifySuccessMessage(expectedText: string) {
    const message = await this.page.locator('.alert-success');
    await message.waitFor();
    await expect(message).toContainText(expectedText);
  }
}