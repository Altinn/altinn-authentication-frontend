import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

enum TestNames {
  SETUP = 'setup',
  SELECT_VENDOR_SYSTEM = 'select_vendor_system',
}

dotenv.config({
  path: path.resolve(__dirname, `config/.env.${process.env.environment ?? 'at22'}`),
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2eTests',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['dot'],
    [
      'json',
      {
        outputFile: 'jsonReports/jsonReport.json',
      },
    ],
    [
      'html',
      {
        open: 'on-failure',
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {},
  },

  /* Configure projects for major browsers */
  projects: [
    { name: TestNames.SETUP, testMatch: /.*\.setup\.ts/ },
    {
      name: TestNames.SELECT_VENDOR_SYSTEM,
      testMatch: '*.spec.ts',
      dependencies: [TestNames.SETUP],
      use: { ...devices['Desktop Chrome'], storageState: '.playwright/.auth/user.json' },
    },
  ],
});
