const fs = require('fs');
const os = require('os');
const path = require('path');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());



async function replyBot(cookiesFilePath, messages, accountLink,append){
    console.log(1)
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
        return console.log(err,'failed: load browser')
    }
    
    try{
        if (fs.existsSync(cookiesFilePath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf8'));
            await page.setCookie(...cookies);
        }
        else{
            throw new Error(`cokies not found ${Date.now()}`) 
        }
        await page.goto(accountLink,{waitUntill:'networkidle2'})
        wait(3525)
        humanScroll(page)
        console.log(3,`opend:${accountLink}`)
    }catch(err){
        return console.log(err,'failed: cokies or link problem')
    }

    try{
        
    }catch(err){

    }



}

module.exports = {
    replyBot
};