const playwright = require('playwright');
const chai = require('chai');
const expect = chai.expect;
const { describe, it, beforeEach, afterEach } = require('mocha');
const LoginPage = require('../pages/LoginPage');

let page, browser, context

describe.only('vikunja authorization tests', () => {
    beforeEach(async function () {
        // browser = await playwright.chromium.launch({
        //     headless: false,
        //     // slowMo: 500,
        // });
        //
        // context = await browser.newContext();
        // page = await context.newPage();
        await LoginPage.visit();
    });

    afterEach(async function () {
        await browser.close();
    });

    it.only('should successfully authenticate', async () => {
        await page.locator('#username').fill('dostybayeva');
        await page.locator('#password').fill('zabyl123');
        await page.locator('#loginform .button').click();

        const welcomeText = await page.locator('.app-content h2').textContent();

        expect(welcomeText).to.equal('Hi dostybayeva!');
    });

    it('should display error text for wrong username', async () => {
        await page.locator('#username').fill('dostybayeva1');
        await page.locator('#password').fill('zabyl123');
        await page.locator('#loginform .button').click();

        const errorText = await page.locator('.danger').textContent();

        expect(errorText).to.equal('Wrong username or password.');
    });

    it('should display error text for wrong password', async () => {
        await page.locator('#username').fill('dostybayeva');
        await page.locator('#password').fill('zabyl');
        await page.locator('#loginform .button').click();

        const errorText = await page.locator('.danger').textContent();

        expect(errorText).to.equal('Wrong username or password.');
    });

    it('should display error text for missing password field', async () => {
        await page.locator('#username').fill('dostybayeva');
        await page.locator('#loginform .button').click();

        const errorText = await page.locator('.is-danger').textContent();

        expect(errorText).to.equal('Please provide a password.');
    });

    it('should display error text for missing username field', async () => {
        await page.locator('#password').fill('zabyl123');
        await page.locator('#loginform .button').click();

        const errorText = await page.locator('.is-danger').textContent();

        expect(errorText).to.equal('Please provide a username.');
    });
});
