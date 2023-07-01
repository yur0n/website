import Slimbot from 'slimbot'

const bot = new Slimbot('1928057359:AAEe94RZJ7oheBjlyE-gThde79JhU72mSJU')   //   main for VK rudi

// const yur0n = 378931386
// const rudi = 267424833   //   chat id of rudi and this bot
// const inlineKeyboard = (url1, url2) => {        // inline keyboard as object of parameters for bot.sendMessage command
//     return {                                    // url1 = link to от кого, url2 = link to подробнее
//         parse_mode: 'Markdown',                 
//         reply_markup: JSON.stringify({
//             inline_keyboard: [[{ text: "От кого?", url: url1 },
//             { text: "Подробнее", url: url2 }]]
//         })
//     }
// }  

bot.on('message',  mes => {
    bot.sendMessage(mes.chat.id, 'Я буду автоматически присылать новую информацию о твоей группе.')
    console.log(mes.chat.id, mes.text)
})

bot.startPolling()

export default bot