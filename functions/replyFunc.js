const fs = require('fs');
const os = require('os');
const path = require('path');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());



async function replyBot(cookiesFilePath, messages, accountLink, modelName){
    console.log(1,`on ${Date.now()} trying to reply to ${modelName}`)

    async function humanScroll(page) {

        for (let i = 0; i < 3; i++) {
            await page.mouse.wheel({ deltaY: 300 });
            await wait(1000 + Math.random() * 1000);
        }
    }
    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let browser, page
    try{
        browser = await puppeteer.launch({
            headless:false,
        })
        page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' + 'AppleWebKit/537.36 (KHTML, like Gecko) ' + 'Chrome/119 Safari/537.36')
        await page.setViewport({ width: 1280, height: 800 })
        console.log(2,'browser opend')
    }catch(err){
        await browser.close()
        return console.log(err,'2 failed: load browser')
    }
    
    try{
        if (fs.existsSync(cookiesFilePath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf8'));
            await page.setCookie(...cookies);
        }
        else{
            throw new Error(`cokies not found`) 
        }
        await page.goto(accountLink,{waitUntill:'networkidle2'})
        wait(3525)
        humanScroll(page)
        console.log(3,'account opend')
    }catch(err){
        await browser.close()
        return console.log(err,'3 failed: cokies or link problem')
    }

    try{
        await page.waitForSelector('article', { visible: true });
        let article = await page.$$('article')
        article = article[1]
        if(article){
            await article.evaluate(art => art.scrollIntoView({ behavior: 'smooth', block: 'center' }));
            let reply = await article.$('button[data-testid="reply"]')
            reply.click()
            console.log(4 , 'reply opend')
        }else{
            throw new Error('second tweet not found')
        }
    }catch(err){
        await browser.close()
        return console.log(err, '4 failed: not possible to open tweet')
    }

    try{
        let message = messages[Math.floor(Math.random() * messages.length)];
        message = message+'?'+'a='+modelName+'&p=x'
        for (let char of message) {
            await page.keyboard.type(char);
            await wait(30 + Math.random() * 70);
        }
        await page.keyboard.down('Control');
        await page.keyboard.press('Enter');
        await page.keyboard.up('Control');
        console.log(5,'replied')
    }catch(err){
        await browser.close()
        return console.log(err, '4 failed: message form input error')
    }

    try{
        await browser.close()
        console.log(6,`successfuly replied to ${modelName}`)
    }catch(err){
        await browser.process().kill()
        return console.log(err , '6 failed: browser closed forcefully')
    }



}

module.exports = {
    replyBot
};