import botgram from 'botgram'
import geocode from'../utils/geocode.js'
import forecast from'../utils/forecast.js'

const bot = botgram(process.env.BOT_WEATHER)

bot.command("start", async function (msg, reply, next) {
  await reply.text(`Hello ${msg.from.name}, I'm Weather bot - get your city's frecast!`)
  reply.text('Write down any city you want to check forecast for.')
  console.log("Received a /start command from", msg.from.username || msg.from.name);
});

bot.text(async function (msg, reply, next) {
  await reply.text('Loading...')
  let position = await geocode(msg.text)
  if (!position.latitude) return reply.editText(msg.id + 1, position)
  let prediction = await forecast(position.latitude, position.longitude)
  if (!prediction.today) return reply.editText(msg.id + 1, prediction)
  await reply.editText(msg.id + 1, prediction.today)
  reply.text(prediction.tomorrow)
}); 




