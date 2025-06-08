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

let main = async function(num="5"){
    console.log(1)
    await bot.replyBot(`./loginCookies/${num}.json`, messages,"https://x.com/sophieraiin",'sophierain')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/yumietooXO','yumietooXO')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/sarasfamurri','sarasfamurri')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/melissastarova_','melissastarova_')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/camilla_ara1','camilla_ara1')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/virtualtorii7','virtualtorii7')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/kelseyrayexox','kelseyrayexox')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/iamlinneaxoxo','iamlinneaxoxo')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/MoreLeahRay','MoreLeahRay')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/_genbenz','_genbenz')
    await bot.replyBot(`./loginCookies/${num}.json`, messages,'https://x.com/summerxiris','summerxiris')
        console.log(3)
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
//https://x.com/prettyalyssaxo
