const playwright = require("playwright");

let page, browser, context

module.exports = {
    // selectors: {
    //
    // },
    async visit() {
        browser = await playwright.chromium.launch({
            headless: false,
            // slowMo: 500,
        });

        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://try.vikunja.io/login');
    },
}
