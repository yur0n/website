import Slimbot from 'slimbot';
import DataVK from '../models/messages.js'

const bot = new Slimbot('1928057359:AAEe94RZJ7oheBjlyE-gThde79JhU72mSJU')   //   main for VK rudi



// const yur0n = 378931386
const rudi = 267424833   //   chat id of rudi and this bot
const inlineKeyboard = (url1, url2) => {        // inline keyboard as object of parameters for bot.sendMessage command
    return {                                    // url1 = link to от кого, url2 = link to подробнее
        parse_mode: 'Markdown',                 
        reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "От кого?", url: url1 },
            { text: "Подробнее", url: url2 }]]
        })
    }
}  

bot.on('message',  mes => {
    bot.sendMessage(mes.chat.id, 'Я буду автоматически присылать новую информацию о твоей группе.')
    console.log(mes.chat.id, mes.text)
})

const getData = async (data) => {

    try {
        if (data.object.from_id == 441232274) return
 	    if (data.object.from_id == -124949590) return         
        switch (data.type) {
            case 'wall_reply_new':
                await bot.sendMessage(rudi, 'Добавление комментария на стене:')
                await bot.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/sib_herb?w=wall-124949590_${data.object.post_id}`))
                break        
            case 'message_new':
                await bot.sendMessage(rudi, 'Входящее сообщение:')
                await bot.sendMessage(rudi, data.object.message.text, inlineKeyboard
                    (`https://vk.com/id${data.object.message.from_id}`, `https://vk.com/im?sel=-${data.group_id}`))
                break        
            case 'board_post_new':
                await bot.sendMessage(rudi, 'Создание комментария в обсуждении:')
                await bot.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/topic-124949590_${data.object.topic_id}`))   
                break
            case 'market_comment_new':
                await bot.sendMessage(rudi, 'Новый комментарий к товару:')
                await bot.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                break
            case 'market_comment_edit':
                await bot.sendMessage(rudi, 'Редактирование комментария к товару:')
                await bot.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                break
            case 'market_comment_restore':
                await bot.sendMessage(rudi, 'Восстановление комментария к товару:')
                await bot.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                break
            case 'vkpay_transaction':
                await bot.sendMessage(rudi, 'Платёж через VK Pay:')
                await bot.sendMessage(rudi, `${data.object.amount} руб. с комментарием: ${data.object.description}`, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`))
                break
        }
        bot.sendMessage(rudi, '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
    } catch(e) {
        await bot.sendMessage(rudi, 'Ошибка обработки события, необходимо связаться с yur0n')
        bot.sendMessage(rudi, '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
    }

        new DataVK ({
            name: data.type,
            date: new Date,
            dataRecieved: data
        }).save().then(() => {
            console.log('Message received')
        }).catch((error) => {
            console.log('Error', error)
	})
}


bot.startPolling(); 





