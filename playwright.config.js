/**
 * Playwright configuration file
 */
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './',

    timeout: 60000,

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['list']
    ],

    use: {

        baseURL: 'https://qastats.com',

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure', 

        actionTimeout: 30000,

        navigationTimeout: 30000,

    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        /**
         * Uncomment these to test mobile devices
         */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...device['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },
    ],

});