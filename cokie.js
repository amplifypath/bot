const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/login');

  console.log('Please log in manually...');
  await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds

  const cookies = await page.cookies();
  fs.writeFileSync('twitter_cookies.json', JSON.stringify(cookies, null, 2));
  console.log('Cookies saved.');

  await browser.close();
})();