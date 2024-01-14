import { Bot } from 'grammy'
import DataVK from '../models/messages.js';

const bot = new Bot(process.env.BOT_VK_RUDI) 

bot.on('message',  ctx => {
    ctx.reply('Я буду автоматически присылать новую информацию о твоей группе.')
})
bot.start()

const rudi = 267424833   // chat id
const inlineKeyboard = (url1, url2) => {        // inline keyboard as object of parameters for bot.api.sendMessage command
    return {                                    // url1 = link to от кого, url2 = link to подробнее
        parse_mode: 'Markdown',                 
        reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "От кого?", url: url1 },
            { text: "Подробнее", url: url2 }]]
        })
    }
}  

export default async (req, res) => {
    const data = req.body;
        try {
            const restricted = [441232274, -124949590]
            if (restricted.includes(data.object?.from_id)) return     
            switch (data.type) {
                case 'wall_reply_new':
                    await bot.api.sendMessage(rudi, 'Добавление комментария на стене:')
                    await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                        (`https://vk.com/id${data.object.from_id}`, `https://vk.com/sib_herb?w=wall-124949590_${data.object.post_id}`))
                    break        
                case 'message_new':
                    await bot.api.sendMessage(rudi, 'Входящее сообщение:')
                    await bot.api.sendMessage(rudi, data.object.message.text, inlineKeyboard
                        (`https://vk.com/id${data.object.message.from_id}`, `https://vk.com/im?sel=-${data.group_id}`))
                    break        
                case 'board_post_new':
                    await bot.api.sendMessage(rudi, 'Создание комментария в обсуждении:')
                    await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                        (`https://vk.com/id${data.object.from_id}`, `https://vk.com/topic-124949590_${data.object.topic_id}`))   
                    break
                case 'market_comment_new':
                    await bot.api.sendMessage(rudi, 'Новый комментарий к товару:')
                    await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                        (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                    break
                case 'market_comment_edit':
                    await bot.api.sendMessage(rudi, 'Редактирование комментария к товару:')
                    await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                        (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                    break
                case 'market_comment_restore':
                    await bot.api.sendMessage(rudi, 'Восстановление комментария к товару:')
                    await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                        (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                    break
                case 'vkpay_transaction':
                    await bot.api.sendMessage(rudi, 'Платёж через VK Pay:')
                    await bot.api.sendMessage(rudi, `${data.object.amount} руб. с комментарием: ${data.object.description}`, inlineKeyboard
                        (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                    break
                case 'confirmation':
                    await bot.api.sendMessage(rudi, 'Получен запрос на подтверждение адреса сервера.')
                    break
            }
            bot.api.sendMessage(rudi, '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
        } catch(e) {
            await bot.api.sendMessage(rudi, 'Ошибка обработки события, необходимо связаться с yur0n')
            bot.api.sendMessage(rudi, '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
        }
    new DataVK ({
        name: data.type,
        date: new Date,
        dataRecieved: data
    }).save().catch((e) => console.log('Error', e))
    res.send('b883b016')
}