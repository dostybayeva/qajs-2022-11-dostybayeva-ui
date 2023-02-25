const playwright = require('playwright');
const chai = require('chai');
const expect = chai.expect;
const { describe, it, beforeEach, afterEach } = require('mocha');

let page, browser, context

const selectors = {
    userNameField: '#user-name',
    passwordField: '#password',
    loginButton: '#login-button',
    lockedError: '[data-test="error"]',
};

const credentials = {
    url: 'https://www.saucedemo.com',
    successName: 'standard_user',
    lockedName: 'locked_out_user',
    password: 'secret_sauce'
};

describe('saucedemo tests', () => {
    beforeEach(async function() {
        browser = await playwright.chromium.launch({
            headless: false,
            slowMo: 1000,
        });

        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async function() {
        await browser.close();
    });

    it('should successfully authenticate', async () => {
        await page.goto(credentials.url);
        await page.locator(selectors.userNameField).fill(credentials.successName);
        await page.locator(selectors.passwordField).fill(credentials.password);
        await page.click(selectors.loginButton);
        const curUrl = page.url();
        expect(curUrl).to.equal(`${credentials.url}/inventory.html`);
    });

    it('should display error text for locked user', async () => {
        await page.goto(credentials.url);
        await page.locator(selectors.userNameField).fill(credentials.lockedName);
        await page.locator(selectors.passwordField).fill(credentials.password);
        await page.click(selectors.loginButton);
        const errorText = await page.locator(selectors.lockedError).textContent();
        expect(errorText).to.equal('Epic sadface: Sorry, this user has been locked out.')
    });

    it.only('should successfully open product', async () => {
        await page.goto(credentials.url);
        await page.locator(selectors.userNameField).fill(credentials.successName);
        await page.locator(selectors.passwordField).fill(credentials.password);
        await page.click(selectors.loginButton);

        const productName = await page.locator('.inventory_item_name').first().textContent();
        console.log(productName)
        await page.locator('.inventory_item_name').first().click();


    });
    //
    // it('should successfully add product to cart', async () => {
    //
    // });
    //
    // it('should successfully remove product from cart', async () => {
    //
    // });
});
