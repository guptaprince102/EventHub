// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker, workers } from 'node:cluster';
import { time } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests/',
  retries: 3,
  workers: 1,
  timeout: 90 * 1000,
  expect: {
    timeout: 15000,
  },
  use: {
   browserName: 'chromium',
   trace: 'on',
   headless : true,
   screenshot: 'on',

  },
});
module.exports = config;

