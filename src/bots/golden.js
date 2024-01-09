import Slimbot from 'slimbot'
import Golduser from '../models/gold.js'
const bot = new Slimbot(process.env.BOT_GOLD)

const inlineKeyboard = (url1, url2) => {        // inline keyboard as object of parameters for bot.sendMessage command
    return {                                    // url1 = link to от кого, url2 = link to подробнее
        parse_mode: 'Markdown',                 
        reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "Наш магазин", url: url1 },
            { text: "Ваш аккаунт", url: url2 }]]
        })
    }
}

bot.on('message',  async (mes) => {
    let user = await Golduser.findOne({name: mes.text})
    if (!user) {
        bot.sendMessage(mes.chat.id, `${mes.text} не совершил ни одной покупки. Введите ваше имя повторно`)
    } else {
        user.chat = mes.chat.id
        await user.save().catch((error) => console.log('Error', error))
        bot.sendMessage(mes.chat.id, `Здравствуйте, ${user.name}. У вас ${user.bonus} бонус! Вы можете использовать их в нашем магазине.`, 
        inlineKeyboard(`https://yuron.xyz/gold`, `https://yuron.xyz/gold?name=${user.name}`))
    }
})

bot.startPolling(); 

export default async (data) => {
    let user = await Golduser.findOne({name: data.goldUserName})
    if (!user.chat) return console.log('Не контактировал с ботом')
    bot.sendMessage(user.chat, `Cпасибо, что совершили покупку! Вы получили ${data.goldUserBonus} бонус, теперь у вас ${user.bonus} бонус! Вы можете использовать их в нашем магазине.`, 
        inlineKeyboard(`https://yuron.xyz/gold`, `https://yuron.xyz/gold?name=${user.name}`))
}
