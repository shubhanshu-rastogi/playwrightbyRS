// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

require('dotenv').config(); // Load .env
//const { defineConfig } = require('@playwright/test');
const env = require('./config/env.config');

module.exports = defineConfig({
  use: {
    baseURL: env.baseURL,
    headless: false,                  // 👈 run with browser UI
    actionTimeout: env.timeout,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  timeout: 60 * 1000,
  retries: 0,
  //reporter: 'html',
  reporter: [
    ['list'], 
    ['allure-playwright']
  ],
});



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
 
      testDir : './tests',
      timeout : 40*1000,
      expect : {
        timeout : 5*1000
      },
      reporter:'html',

  use: {
   
    browserName : 'chromium',
    headless :false,
    screenshot : 'on',
    trace: 'retain-on-failure',
    
  },


});

