import { Bot } from 'grammy'
import Golduser from '../models/gold.js'
const bot = new Bot(process.env.BOT_GOLD)

const inlineKeyboard = (url1, url2) => {
    return {
        parse_mode: 'Markdown',                 
        reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "Наш магазин", url: url1 },
            { text: "Ваш аккаунт", url: url2 }]]
        })
    }
}

bot.command('start', async ctx => {
    ctx.reply('Введіть імʼя, щоб перевірити ваш баланс бонусів.')
})

bot.on('message',  async ctx => {
    if (ctx.msg.text == '/start') {
        ctx.reply 
    }
    let user = await Golduser.findOne({name: ctx.msg.text})
    if (!user) {
        ctx.reply(`${ctx.msg.text} не зробив жодної покупки. Введіть інше імʼя.`)
    } else {
        user.chat = ctx.from.id
        await user.save().catch((error) => console.log('Error', error))
        ctx.reply(`Вітаю, ${user.name}. У вас ${user.bonus} бонус! Ви можете викорастити їх в нашому магазині.`, 
        inlineKeyboard(`https://yuron.xyz/gold`, `https://yuron.xyz/gold?name=${user.name}`))
    }
})

bot.start()

async function newBuy (data) {
    let user = await Golduser.findOne({name: data.goldUserName})
    if (!user.chat) return
    await bot.api.sendMessage(user.chat, `Дякую, що зробили покупку! Ви отримали ${data.goldUserBonus} бонус, тепер у вас ${user.bonus} бонус! Ви можете викорастити їх у нашому магазині.`, 
        inlineKeyboard(`https://yuron.xyz/gold`, `https://yuron.xyz/gold?name=${user.name}`))
}


export default async (req, res) => {
    if (!req.query.name || !req.query.bonus) return res.send({error: 'no user provided'})
    let goldUserName = req.query.name
    let goldUserBonus = req.query.bonus
    try {
        let currentGoldUser = await Golduser.findOne({name: goldUserName})
        if (!currentGoldUser) {
            const newGoldUser = new Golduser({
                name: goldUserName,
                bonus: goldUserBonus
            })
            await newGoldUser.save()
        } else {
            currentGoldUser.bonus += +goldUserBonus
            await currentGoldUser.save()
            newBuy({goldUserName, goldUserBonus})
        }
    } catch (e) {
        console.log(e)
    }
    res.send('ok')
}