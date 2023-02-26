const playwright = require('playwright');
const chai = require('chai');
const expect = chai.expect;
const { describe, it, beforeEach, afterEach } = require('mocha');

let page, browser, context

describe('vikunja list tests', () => {
    beforeEach(async function () {
        browser = await playwright.chromium.launch({
            headless: false,
            slowMo: 500,
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

    it('should successfully create new first list from namespaces page', async () => {
        await page.goto('https://try.vikunja.io/namespaces');
        await page.locator('.namespace .base-button').click();
        await page.locator('[name="listTitle"]').fill('list1');
        await page.locator('.card-footer .ml-2').click();

        // await page.locator('.list-card').click();
        // вынести в after
        await page.locator('.list-title-button .fa-ellipsis').click();
        await page.locator('.has-text-danger').click();
        await page.locator('.actions button').nth(1).click();


    });

});
