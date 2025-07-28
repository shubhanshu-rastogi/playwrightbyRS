// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import env from './config/env.config';

dotenv.config(); // Load .env

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  retries: 0,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright'],
  ],
  use: {
    baseURL: env.baseURL,
    browserName: 'chromium',
    headless: false, // run with browser UI
    actionTimeout: env.timeout,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
