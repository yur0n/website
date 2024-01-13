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

bot.on('message',  async ctx => {
    let user = await Golduser.findOne({name: ctx.msg.text})
    if (!user) {
        ctx.reply(`${ctx.msg.text} не совершил ни одной покупки. Введите ваше имя повторно`)
    } else {
        user.chat = ctx.from.id
        await user.save().catch((error) => console.log('Error', error))
        ctx.reply(`Здравствуйте, ${user.name}. У вас ${user.bonus} бонус! Вы можете использовать их в нашем магазине.`, 
        inlineKeyboard(`https://yuron.xyz/gold`, `https://yuron.xyz/gold?name=${user.name}`))
    }
})

bot.start()

export default async (data) => {
    let user = await Golduser.findOne({name: data.goldUserName})
    if (!user.chat) return
    await bot.api.sendMessage(user.chat, `Cпасибо, что совершили покупку! Вы получили ${data.goldUserBonus} бонус, теперь у вас ${user.bonus} бонус! Вы можете использовать их в нашем магазине.`, 
        inlineKeyboard(`https://yuron.xyz/gold`, `https://yuron.xyz/gold?name=${user.name}`))
}
