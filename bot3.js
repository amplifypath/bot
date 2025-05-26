const fs = require('fs');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const bot = require('./functions/replyFunc.js')

const messages = [
        "Honestly? Better than most paid stuff: https://sex-positions.site",
        "This should be illegal in some countries: https://sex-positions.site",
        "Super fun to explore with a partner or solo: https://sex-positions.site",
        "Whoever made this was too creative: https://sex-positions.site",
        "This deserves more attention: https://sex-positions.site",
        "You haven’t tried anything like this yet: https://sex-positions.site",
        "Saw this and thought of this feed: https://sex-positions.site",
        "Try this before tonight: https://sex-positions.site",
        "Don’t miss this one: https://sex-positions.site"
];

let main = async function(num=3){
    console.log(1)
    await bot.replyBot(`./loginCookies/${num}.json`, messages,"https://x.com/sophieraiin")
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/yumietooXO')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/sarasfamurri')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/melissastarova_')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/camilla_ara1')
//    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/kaitviolet_01')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/virtualtorii7')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/kelseyrayexox')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/iamlinneaxoxo')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/MoreLeahRay')
//    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/emelizabethhh')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/_genbenz')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/summerxiris')
}

async function loopMain() {
    while (true) {
        try {
            await main(); 
        } catch (err) {
            console.error('Main failed:', err);
        }
        await new Promise(res => setTimeout(res, 60*60*24*400)); 
    }
}

loopMain();

//https://x.com/ellababyy18
