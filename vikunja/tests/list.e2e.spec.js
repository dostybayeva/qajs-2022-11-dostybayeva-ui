const playwright = require('playwright');
const chai = require('chai');
const expect = chai.expect;
const { describe, it, beforeEach, afterEach } = require('mocha');

let page, browser, context

describe.only('vikunja authorization tests', () => {
    beforeEach(async function () {
        browser = await playwright.chromium.launch({
            headless: true,
            // slowMo: 500,
        });

        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('https://try.vikunja.io/login');
        await page.locator('#username').fill('dostybayeva');
        await page.locator('#password').fill('zabyl123');
        await page.locator('#loginform .button').click();
    });

    afterEach(async function () {
        await browser.close();
    });

    it.only('should successfully create new list from namespaces page', async () => {
        await page.goto('https://try.vikunja.io/namespaces');
        await page.locator('.namespace .base-button').click()
    });

});
