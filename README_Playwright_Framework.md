# 🧪 Playwright Test Automation Framework

A robust Playwright test automation framework with support for:

- ✅ Environment-based configuration (dev, QA, prod)
- ✅ .env-driven runtime configuration and secrets
- ✅ Page Object Model structure
- ✅ Allure reporting for clean HTML reports

---

## 📁 Project Structure

```
playwrightnew/
├── tests/                     # All test cases
├── page-objects/              # Page Object classes
├── config/
│   └── env.config.js          # Environment-based config
├── utils/                     # Helpers like Excel/JSON readers
├── .env                       # Active ENV + credentials
├── playwright.config.js       # Global Playwright settings
├── package.json
```

---

## ⚙️ Environment Configuration

Supports switching between environments like `dev`, `qa`, and `prod` using a `.env` file.

### 1. Create `.env`

```env
ENV=prod
USERNAME=your_username
PASSWORD=your_password
```

> Note: `.env` is loaded using the `dotenv` package.

### 2. Define config in `config/env.config.js`

```js
require('dotenv').config();

const environments = {
  dev: {
    baseURL: 'http://dev.automationexercise.com',
    username: 'dev_user',
    password: 'dev_pass',
    timeout: 30000
  },
  qa: {
    baseURL: 'http://qa.automationexercise.com',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    timeout: 30000
  },
  prod: {
    baseURL: 'https://automationexercise.com',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    timeout: 30000
  }
};

module.exports = environments[process.env.ENV || 'dev'];
```

---

## 🧠 Using Environment Config in Tests & Page Objects

### In `playwright.config.js`:

```js
require('dotenv').config();
const env = require('./config/env.config');

module.exports = defineConfig({
  use: {
    baseURL: env.baseURL,
    headless: false,
    actionTimeout: env.timeout,
    trace: 'on',
    screenshot: 'only-on-failure'
  },
  reporter: [['list'], ['allure-playwright']],
});
```

### In a test file:

```js
const env = require('../config/env.config');

test('Login Test', async ({ page }) => {
  await page.goto('/');
  await page.fill('#username', env.username);
  await page.fill('#password', env.password);
  await page.click('button[type="submit"]');
});
```

### In a Page Object (e.g., HomePage.js):

```js
const config = require('../config/env.config');

async open() {
  await this.page.goto(config.baseURL);
}
```

---

## 🚀 Run Tests in Different Environments

### PowerShell (VS Code default):

```bash
$env:ENV="prod"; npx playwright test --ui
```

### Command Prompt:

```cmd
set ENV=prod && npx playwright test --ui
```

### Git Bash / macOS / Linux:

```bash
ENV=prod npx playwright test --ui
```

---

## 📊 Allure Reporting

### 1. Install Allure adapter:

```bash
npm install -D allure-playwright
```

### 2. Add to `playwright.config.js`:

```js
reporter: [['list'], ['allure-playwright']]
```

### 3. Run your tests:

```bash
npx playwright test
```

### 4. Generate Allure Report:

```bash
npx allure generate allure-results --clean -o allure-report
```

### 5. Open Allure Report:

```bash
npx allure open allure-report
```

---

## 🔁 Helpful NPM Scripts (Optional)

In `package.json`:

```json
"scripts": {
  "test": "npx playwright test",
  "test:prod": "cross-env ENV=prod npx playwright test",
  "allure:report": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report"
}
```

---

## 🧼 Recommended `.gitignore`

```gitignore
.env
allure-report/
allure-results/
```

---

## 📦 Dependencies

```bash
npm install --save-dev playwright @playwright/test dotenv allure-playwright
```

---

## ✅ Summary

| Feature            | Included |
|--------------------|----------|
| Environment config | ✅        |
| .env support       | ✅        |
| Allure reporting   | ✅        |
| POM structure      | ✅        |
| CI-ready           | ✅        |

---

> Feel free to customize base URLs, timeouts, and credentials per environment.