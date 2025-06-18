const fs = require('fs');
const os = require('os');
const path = require('path');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function replyBot(cookiesFilePath, messages, accountLink,append) {

    console.log(2);

    // Simple wait helper
    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Simulate a “human” scroll
    async function humanScroll(page) {
        for (let i = 0; i < 3; i++) {
            await page.mouse.wheel({ deltaY: 300 });
            await wait(1000 + Math.random() * 1000);
        }
    }

    // 1. Create a temp folder to use as a “clean” user‐data‐directory
    //    (mimics Incognito: no shared cookies, no cache, etc.)
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer_profile_'));

    // 2. Launch Chrome using that temp folder. Every run is “fresh.”
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--user-data-dir=${tmpDir}`,     // <— each run gets its own temp profile
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });

    // 3. Open a page as usual; it’s already on a clean slate
    const page = await browser.newPage();

  // 4. Set a realistic User-Agent + viewport
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/119 Safari/537.36'
    );
    await page.setViewport({ width: 1280, height: 800 });

    // 5. If cookies JSON exists, load them into this fresh profile
    if (fs.existsSync(cookiesFilePath)) {
        const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf8'));
        await page.setCookie(...cookies);
    }

    // 6. Navigate to the target account
    await page.goto(accountLink, { waitUntil: 'networkidle2' });
    await wait(3000);
    await humanScroll(page);

    // 7. Scrape the first few <article> tweets, pick the second link
    const tweetLinks = await page.$$eval('article', (articles) => {
        return articles
        .map(article => {
            const a = article.querySelector('a[href*="/status/"]');
            return a ? a.href : null;
        })
        .filter(Boolean);
    });

    if (!tweetLinks[1]) {
        console.log('Second tweet not found.');
        await browser.close();
        return;
    }

    // 8. Open that second tweet
    const tweetURL = tweetLinks[1];
    console.log('Replying to:', tweetURL);
    await page.goto(tweetURL, { waitUntil: 'networkidle2' });
    await wait(3000);
    await humanScroll(page);

    // 9. Hit “r” to focus the reply box
    await page.keyboard.press('r');
    await wait(1000);

    // 10. Type a random message from your array
    let message = messages[Math.floor(Math.random() * messages.length)];
    message = message+'?'+'a='+append+'&p=x'
    for (let char of message) {
        await page.keyboard.type(char);
        await wait(30 + Math.random() * 70);
    }

    // 11. Submit via Ctrl+Enter
    await page.keyboard.down('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.up('Control');

    console.log(accountLink, message, new Date());
    await wait(5000);

    // 12. Close the browser. This also “aborts” the temp profile.
    await browser.close();

    // (Optional) You can delete the temp folder now, if you want:
    // fs.rmSync(tmpDir, { recursive: true, force: true });

    // 13. Final random delay before returning
    await wait((Math.random() * 10 + 20) * 100);
}

module.exports = {
  replyBot
};
