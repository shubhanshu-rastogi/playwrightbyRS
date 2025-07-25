import { Page, Locator, expect } from '@playwright/test';

export class BaseElement {
  constructor(private page: Page) {}

  getElement(type: string, name: string): Locator {
    switch (type.toLowerCase()) {
      case 'button':
        return this.page.getByRole('button', { name });
      case 'link':
        return this.page.getByRole('link', { name });
case 'textbox':
case 'input':
  return this.page.locator(`xpath=//label[contains(text(),"${name}")]/following-sibling::input | //label[contains(text(),"${name}")]/../input`);
      case 'placeholder':
        return this.page.getByPlaceholder(name);
      case 'label':
        return this.page.locator(`label:has-text("${name}")`);
      case 'checkbox':
        return this.page.getByRole('checkbox', { name });
      case 'radio':
        return this.page.getByRole('radio', { name });
      case 'dropdown':
      case 'combobox':
        return this.page.getByRole('combobox', { name });
      default:
        throw new Error(`Unsupported element type: ${type}`);
    }
  }

  async setValue(type: string, name: string, value: string) {
    const element = this.getElement(type, name);
    await element.waitFor({ state: 'visible' });

    switch (type.toLowerCase()) {
      case 'textbox':
      case 'input':
      case 'placeholder':
        await element.fill('');
        await element.fill(value);
        break;

      case 'radio':
      case 'checkbox':
        const isChecked = await element.isChecked();
        if (!isChecked) await element.check();
        break;

      case 'dropdown':
      case 'combobox':
        await element.selectOption({ label: value }).catch(async () => {
          await element.selectOption(value); // fallback to value match
        });
        break;

      default:
        throw new Error(`Setting value not supported for: ${type}`);
    }
  }

  async click(type: string, name: string) {
    const element = this.getElement(type, name);
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async getText(type: string, name: string): Promise<string> {
    const element = this.getElement(type, name);
    await element.waitFor({ state: 'visible' });
    return await element.textContent() ?? '';
  }

  async isVisible(type: string, name: string): Promise<boolean> {
    const element = this.getElement(type, name);
    return await element.isVisible();
  }

  async hover(type: string, name: string) {
    const element = this.getElement(type, name);
    await element.waitFor({ state: 'visible' });
    await element.hover();
  }

  async expectText(type: string, name: string, expected: string) {
    const actualText = await this.getText(type, name);
    expect(actualText.trim()).toBe(expected);
  }
}