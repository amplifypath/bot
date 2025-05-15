const fs = require('fs');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());




async function replyBot(cookiesFilePath, messages,accountLink) {

    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function humanScroll(page) {
        for (let i = 0; i < 3; i++) {
          await page.mouse.wheel({ deltaY: 300 });
          await wait(1000 + Math.random() * 1000);
        }
      }


    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
  
    // Set realistic user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });
  
    // Load cookies if available
    if (fs.existsSync(cookiesFilePath)) {
      const cookies = JSON.parse(fs.readFileSync(cookiesFilePath));
      await page.setCookie(...cookies);
    }
  
    await page.goto(accountLink, { waitUntil: 'networkidle2' });
    await wait(3000);
    await humanScroll(page);
  
    // Get the first few article tags and work with the second one directly
    const tweetLinks = await page.$$eval('article', (articles) => {
      const validTweets = articles
        .map(article => {
          const linkEl = article.querySelector('a[href*="/status/"]');
          return linkEl ? linkEl.href : null;
        })
        .filter(Boolean);
      return validTweets;
    });
  
    if (!tweetLinks[1]) {
      console.log('Second tweet not found.');
      await browser.close();
      return;
    }
  
    const tweetURL = tweetLinks[1];
    console.log('Replying to:', tweetURL);
    await page.goto(tweetURL, { waitUntil: 'networkidle2' });
    await wait(3000);
    await humanScroll(page);
  
    // Focus reply box
    await page.keyboard.press('r');
    await wait(1000);
  
    // Type message
    const message = messages[Math.floor(Math.random() * messages.length)];
    for (let char of message) {
      await page.keyboard.type(char);
      await wait(30 + Math.random() * 70);
    }
  
    // Submit the reply
    await page.keyboard.down('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.up('Control');
  
    console.log('Replied with:', message);
    await wait(5000);
    await browser.close();
  }

module.exports = {
    replyBot
}