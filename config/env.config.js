require('dotenv').config(); // Load .env

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
    baseURL: 'http://automationexercise.com',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    timeout: 30000
  }
};

// Select environment based on ENV variable
module.exports = environments[process.env.ENV || 'prod'];