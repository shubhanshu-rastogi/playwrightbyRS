const { expect } = require('@playwright/test');

class ElementUtils {
  /**
   * Waits for the element to be visible, then clicks it.
   * @param {Locator} locator - Playwright locator
   */
  async clickElement(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Waits for the element to be visible, then fills it with text.
   * @param {Locator} locator - Playwright locator
   * @param {string} text - Text to enter
   */
  async typeText(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  /**
   * Waits for the element and returns its visibility state.
   * @param {Locator} locator - Playwright locator
   * @returns {boolean}
   */
  async isVisible(locator) {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifies if text is visible on the page.
   * @param {Page} page - Playwright page object
   * @param {string} text - Text to verify
   */
  async verifyTextVisible(page, text) {
    await expect(page.locator(`text=${text}`)).toBeVisible();
  }

  /**
   * Selects an option from a dropdown by value.
   * @param {Locator} locator - Dropdown locator
   * @param {string} value - Option value to select
   */
  async selectDropdown(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  /**
   * Waits for an element to disappear.
   * @param {Locator} locator
   */
  async waitForElementToDisappear(locator) {
    await locator.waitFor({ state: 'hidden' });
  }
}

module.exports = ElementUtils;
