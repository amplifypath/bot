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

let main = async function(){
    console.log(1)
    await bot.replyBot('./loginCookies/1.json', messages,"https://x.com/sophieraiin")
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/yumietooXO')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/sarasfamurri')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/melissastarova_')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/camilla_ara1')
//    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/kaitviolet_01')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/virtualtorii7')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/kelseyrayexox')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/iamlinneaxoxo')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/MoreLeahRay')
//    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/emelizabethhh')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/_genbenz')
    await bot.replyBot('./loginCookies/1.json', messages,'https://x.com/summerxiris')
}
//main()
async function loopMain() {
    while (true) {
        try {
            await main(); // Wait for all puppeteer tasks to finish
        } catch (err) {
            console.error('Main failed:', err);
        }
        await new Promise(res => setTimeout(res, 60*60*24*400)); 
    }
}

loopMain();

/*
let bot1 = setInterval(()=>{
    bot.replyBot('./loginCookies/1.json', messages,"https://x.com/sophieraiin")
},10*60*60*24*12)


let bot2 = setInterval(()=>{
    bot.replyBot('./loginCookies/1.json', messages,'https://x.com/yumietooXO'
},10*60*60*24*15)



let bot3 = setInterval(()=>{
    bot.replyBot('./loginCookies/.1json', messages,'https://x.com/sarasfamurri')
},10*60*60*24*14)



let bot4 = setInterval(()=>{
  bot.replyBot('./loginCookies/1.json', messages,'https://x.com/melissastarova_')
},10*60*60*24*11)


let bot5 = setInterval(()=>{
  bot.replyBot('./loginCookies/1.json', messages,'https://x.com/camilla_ara1')
},10*60*60*24*13)
*/

