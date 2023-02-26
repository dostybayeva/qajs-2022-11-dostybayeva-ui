const playwright = require('playwright');
const chai = require('chai');
const expect = chai.expect;
const { describe, it, beforeEach, afterEach } = require('mocha');

let page, browser, context

const selectors = {
    addToCartButton: '.btn_inventory',
    cartPageLink: '.shopping_cart_link',
    productName: '.inventory_item_name',
    productNameOnProductPage: '.inventory_details_name',
    removeFromCartButton: '.cart_button',
    removedProduct: '.removed_cart_item',
};

const credentials = {
    cookieData: {
        domain: 'www.saucedemo.com',
        cookieValue: 'standard_user',
        cookieName: 'session-username',
    },
    baseUrl: 'https://www.saucedemo.com',
};

describe('saucedemo product tests', () => {
    beforeEach(async function() {
        browser = await playwright.chromium.launch({
            headless: true,
        });

        context = await browser.newContext();
        page = await context.newPage();

        await context.addCookies([{
            name: credentials.cookieData.cookieName,
            value: credentials.cookieData.cookieValue,
            domain: credentials.cookieData.domain,
            path: "/"
        }]);
    });

    afterEach(async function() {
        await browser.close();
    });

    it('should successfully open product page', async () => {
        await page.goto(`${credentials.baseUrl}/inventory.html`);

        const productNameOnMainPage = await page.locator(selectors.productName).first().textContent();

        await page.locator(selectors.productName).first().click();

        const currentUrl = page.url();
        const productNameOnProductPage = await page.locator(selectors.productNameOnProductPage).textContent();

        expect(currentUrl).to.contain('/inventory-item.html');
        expect(productNameOnMainPage).to.equal(productNameOnProductPage);
    });

    it('should successfully add product to cart', async () => {
        await page.goto(`${credentials.baseUrl}/inventory.html`);

        const productNameOnMainPage = await page.locator(selectors.productName).first().textContent();

        await page.locator(selectors.addToCartButton).first().click();
        await page.locator(selectors.cartPageLink).click();

        const productNameInCart = await page.locator(selectors.productName).textContent();
        const currentUrl = page.url();

        expect(currentUrl).to.contain('/cart.html');
        expect(productNameOnMainPage).to.equal(productNameInCart);
    });

    it('should successfully remove product from cart', async () => {
        await page.goto(`${credentials.baseUrl}/inventory.html`);
        await page.locator(selectors.addToCartButton).first().click();
        await page.locator(selectors.cartPageLink).click();
        await page.locator(selectors.removeFromCartButton).click();

        expect(selectors.removedProduct).to.exist;
    });
});
