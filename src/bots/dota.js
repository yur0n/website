import botgram from "botgram"
import request from 'request'
const bot = botgram(process.env.BOT_DOTA)

var key = [
    [ { text: "Рудя \u{1F92C}"}, {text: "Грызля \u{1F921}"} ],
    [ { text: "Антон \u{1F913}"}, {text: "Юрон \u{1F934}"} ]
]

const loading = ['loading..', 'loading...', 'loading....', 'loading.....', 'loading......']

const stats = async (reply, msg, response) => {
    if (response.body[0].kills > response.body[0].deaths) reply.text('А ты хорош, продолжай!')
    await reply.text('Так же ты нанёс ' + response.body[0].hero_damage + ' урона по героям, ' + response.body[0].tower_damage + 
               ' урона по строениям, похилил на ' + response.body[0].hero_healing + ' хп и получал ' + 
               response.body[0].gold_per_min + ' золота/мин с ' + response.body[0].last_hits + ' ластхитами.')
    if ((response.body[0].player_slot <= 4 && response.body[0].radiant_win) || 
        (response.body[0].player_slot > 4 && !response.body[0].radiant_win)) await reply.text("Ты победил! \u{1F638}")
    if ((response.body[0].player_slot > 4 && response.body[0].radiant_win) || 
        (response.body[0].player_slot <= 4 && !response.body[0].radiant_win)) await reply.text("Ты проиграл! \u{1F63F}")
    if (response.body[0].leaver_status == 1) reply.text('Ливер!')
}


bot.command("start", (msg, reply, next) => {
    console.log(msg.from.username, msg.from.name, msg.from.id)
    reply.keyboard(key, true, true).text("Ты кто? Введи свой Steam32 ID, если тебя нет в списке.")
    reply.text('Я буду присылать статистику твоей каждой сыгранной игры.')
})

bot.text( async (msg, reply, next) => {
    if (msg.from.id == -1001160655674) {
        return
    }
    var player = msg.text
    let matchId = 0
    if (msg.text == "Рудя \u{1F92C}") player = '120202499'; if (msg.text == "Антон \u{1F913}") player = '97938416'
    if (msg.text == "Грызля \u{1F921}") player = '115455869'; if (msg.text == "Юрон \u{1F934}") player = '93442227'
    await reply.text('loading.')
    loading.forEach( load => {
        reply.editText(msg.id + 1, load)
    })
    url = `https://api.opendota.com/api/players/${player}/recentMatches`
    request({ url: url, json: true }, async (error, response) => {
        if (error) return await reply.editText(msg.id + 1, 'Неверный ID или настройки приватности')
        try {
        matchId = response.body[0].match_id
        await reply.editText(msg.id + 1, 'В последней игре у тебя ' + response.body[0].kills + ' убийств, ' + 
                       response.body[0].deaths + ' смертей, ' + response.body[0].assists + ' ассистов.')
        stats(reply, msg, response)
        } catch (e) {
            reply.editText(msg.id + 1, 'Неверный ID или настройки приватности')
        }
    })
    setInterval(() => {
        request({ url: url, json: true }, async (error, response) => {
            if (error) return reply.text('Случилось дерьмо: ', error)
            try {
                if (matchId !== response.body[0].match_id) {
                    matchId = response.body[0].match_id
                    await reply.text('В последней игре у тебя ' + response.body[0].kills + ' убийства, ' + 
                            response.body[0].deaths + ' смертей, ' + response.body[0].assists + ' ассистов.')
                    stats(reply, msg, response)
                }
            } catch (e) {
                reply.text('Случилось дерьмо: ', e)
            }    
        })
    }, 900000); 
})