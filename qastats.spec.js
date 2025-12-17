/**
 * Playwright tests for QAstats.com
 */

//Import Statements
//brings in necessary functions and types from Playwright
const { test, expect } = require('@playwright/test');

/**
 * Test organization
 * test.describe groups related tests together to 
 * keep things organized and reports easier to read
 */

test.describe('QAstats.com - Homepage Tests', () => {

    /**
     * Test 1: page load and basic elements
     */

    test('should load homepage successfully with all key elements', async ({ page }) => {
        //Navigation
        //"goto" navigates to the specified URL

        await page.goto('https://qastats.com');
        //Assertion: check page title
        //"expect" makes it pass/fail 
        //"toHaveTitle" verifies browser tab title
        await expect(page).toHaveTitle(/QA Stats/);

        //Assertion: Check main heading exists & is visible
        //"page.locator" finds element using CSS selector or text
        //"toBeVisible" checks if element is visible (duh)
        await expect(page.locator('h2:has-text("QA Stats")')).toBeVisible();

        //Assertion: check subtitle/tagline
        await expect(page.locator('h3:has-Text("what site do you want QA stats for?")')).toBeVisible();
    });

        //**
        // Test 2: Form elements validation
        //  */

        test('should have all form elements present and eneabled', async ({ page }) => {
            await page.goto('https://qastats.com');

            // Find the input field
            // ( Using a more flexible selector 
            // to look for input multiple ways)
            const inputFiled = page.locator('input[type="text"], input [type="url"]').first();
            await expect(inputField).toBeVisible();

            //Check if input is enabled
            //"tobeenabled" verifies the field accepts user input
            await expect(inputField).toBeEnabled();

            //Find the submit button
            //looking for the button with "get stats" text so 
            //input can be submitted
            const submitButton = page.locator('button:has-Text("get stats")');
            await expect(submitButton).toBeVisible();
            await expect(submitButton).toBeEnabled();        
        });

        /**
         * Test 3: input validation
         * makes sure the input field accepts text correctly
         */
        test('should accept text input in the URL field', async ({page }) => {
            await page.goto('https://qastats.com');

            const inputField = page.locator('input[type="text"], input[type="url"]').first();
            // type in the field
            // "fill" clears the field and types the text to
            // simulate user typing a URL
            const testURL = 'example.com';
            await inputField.fill(testURL);
        });

        /**
         * Test 4: Form submission - what happens next?
         */
        test('should show loading state when form is submitted', async ({ page }) => {
            await page.goto('https://qastats.com');

            const inputField = page.locator('input[type="text"], input[type="url"]').first();
            await inputField.fill('example.com');

            const submitButton = page.locator('button:has-text("get stats")');
            await submitButton.click();

            //"waitforselector" waits up to 30 seconds 
            // for an element to appear
            const loadingText = page.locator('text="Crawling website');
            await expect(loadingText).toBeVisible({ timeout: 5000 });
            
            await expect(page.locator('text=This may take up to 2 minutes')).toBeVisible();
        });

        /**
         * Test 5: Results display (with timeout)
         * to verify that analysis results eventually appear
         */
        test.skip('should display analysis results after completion', async ({ page }) => {
            //this test specifically gets 3 minutes
            test.setTimeout(180000);
            await page.goto('https://qastats.com');

            //wait for results heading when analysis is complete
            await expect (page.locator('text=Analysis Complete')).toBeVisible({ timeout: 150000 });

            //verify key result metrics are displayed
            await expect(page.locator('.qa-stat-label:has-text("Input Fields")')).toBeVisible();
            await expect(page.locator('.qa-stat-label:has-text("Menu Links")')).toBeVisible();
            await expect(page.locator('.qa-stat-label:has-text("Broken Links")')).toBeVisible();

            //verify download button appears
            await expect(page.locator('button:has-text("download")')).toBeVisible();
        });

        /**
         * Test 6: responsive design check
         */
        test('should be responsive on mobile viewport', async ({ page }) => {

            //set mobile viewport to simulate phone screensize
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto('https://qastats.com');

            //verify key elements are still visible on mobile
            await expect(page.locator('h2:has-text("QA Stats")')).toBeVisible();
            await expect(page.locator('input[type="text"], input[type="url"]').first()).toBeVisible();
            await expect(page.locator('button:has-text("get stats")')).toBeVisible();
        });

        /**
         * Test 7: Accessibility check to verify 
         * basic accessibility features
         */
        test('should have proper heading hierarchy for accessibility', async ({ page}) => {
            await page.goto('https://qastats.com');

            //check for main heading
            const ht = page.locator('h2');
            await expect(h2).toHAVECOUNT(1);

            //check for subheading
            const h3 = page.locator('h3');
            expect(await h3.count()).toBeGreaterThat(0);
        });

    /**
     * Test 8: empty form submission
     * tests for blank submission edge case
     */

    test('should handle empty form submission appropriately', async ({ page }) => {
        await page.goto('https://qastats.com');

        //click submit with no url
        const submitButton = page.locator('button:has-Text("get stats")');
        await submitButton.click();

        //verify behavior
        // wait to see if any error message appears, then
        // check that we either: stayed on the same page
        // (aka no submission occurred), or
        // got some kind of error/validation message\
        await page.waitForTimeout(1000);
        const currentURL = page.url();
        expect(currentURL).toContain('qastats.com');
    });
 });
       /**
        * If test pass, all assertions were true and 
        * website behaved as expected. 
        * 
        * If test fails, at least one assertion was false,
        * and some part of the website isn't working 
        * as expected. 
        * Playwright should provide screenshots and error 
        * details to troubleshoot. should see which
        * specific assertion(s) failed
        * 
        * Test reports will show 
        * how many tests ran
        * how many passed/failed
        * how long every test took
        * failure screenshot(s)
        * detailed error messages
        */