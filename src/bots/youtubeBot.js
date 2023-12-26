import axios from "axios"
import { Telegraf, Markup, Scenes } from 'telegraf'

const bot = new Telegraf('6869453749:AAFk7RV49SN5fmIMIag_EWyYAyv6yyRUF2M')

function mainMenu(ctx) {
	return Markup.keyboard([
		[ 'Youtube', 'Google Auth' ],
		[ 'hu', 'you' ]
	]).resize()
}

function loh(ctx) {
	return Markup.keyboard([
		[ 'Youtube', 'Google Auth' ],
		[ 'hu', 'you' ]
	]).resize()
}


bot.command('start', async ctx => {
	await ctx.reply('MENU', mainMenu(ctx))
	// await ctx.replyWithHTML(ctx.state.reply.start2)
	// ctx.scene.enter('BOTS_SCENE')
})

bot.hears('Youtube', async (ctx) => {
	ctx.reply('Loh', loh(ctx))
})




bot.catch((err, ctx) => {
	console.log(err)
	ctx.reply('error')
	console.log(`Error for ${ctx.updateType} \nDetails:`)
})
  
bot.launch();
  
  // Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
  
  
process.on('uncaughtException', (err, origin) => {
	console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`)
});