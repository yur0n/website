import { Bot, InlineKeyboard } from 'grammy'
import { conversations, createConversation } from '@grammyjs/conversations';
import DataVK from '../models/messages.js';

const bot = new Bot(process.env.BOT_VK_RUDI)

bot.use(conversations());
bot.use(createConversation(code));
bot.use(createConversation(addClientInfo));

const replyMenu = () => {
    return ctx.reply('Главное меню', {
        reply_markup: new InlineKeyboard()
        .text('Добавить группу')
        .text('Добавить код подтверждения')
    })
}

let confirmationCode = ''
const ids = {
    '124949590': 'Травница'
}

bot.command('start',  ctx => {
    await ctx.reply('Я буду автоматически присылать новую информацию о твоей группе.')
    replyMenu()
    return
})

bot.on('callback_query', async (ctx, next) => {
	await ctx.answerCallbackQuery();
	const callback = ctx.update.callback_query;
	if (callback?.data == 'Добавить группу') {
		await ctx.conversation.enter('code')
	}
	if (callback?.data == 'Добавить код подтверждения') {
        await ctx.conversation.enter('code')
	} 
	next();
});

bot.start()

const rudi = 267424833
const inlineKeyboard = (url1, url2) => {        // inline keyboard as object of parameters for bot.api.sendMessage command
    return {                                    // url1 = link to от кого, url2 = link to подробнее
        parse_mode: 'Markdown',                 
        reply_markup: new InlineKeyboard()
        .url('От кого', url1)
        .url('Подробнее', ul2)
    }
}  

export default async (req, res) => {
    const data = req.body;
    try {
        const restricted = [441232274, ...Object.values(ids).map(id => '-' + id)]
        if (restricted.includes(data.object?.from_id)) return
        const id = data.group_id
        switch (data.type) {
            case 'wall_reply_new':
                await bot.api.sendMessage(rudi, ids[id] + ': Добавление комментария на стене:')
                await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/club${id}?w=wall-124949590_${data.object.post_id}`))
                break        
            case 'message_new':
                await bot.api.sendMessage(rudi, ids[id] + ': Входящее сообщение:')
                await bot.api.sendMessage(rudi, data.object.message.text, inlineKeyboard
                    (`https://vk.com/id${data.object.message.from_id}`, `https://vk.com/im?sel=-${data.group_id}`))
                break        
            case 'board_post_new':
                await bot.api.sendMessage(rudi, ids[id] + ': Создание комментария в обсуждении:')
                await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/topic-${id}_${data.object.topic_id}`))   
                break
            case 'market_comment_new':
                await bot.api.sendMessage(rudi, ids[id] + ': Новый комментарий к товару:')
                await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-${id}?w=product-${id}_${data.object.item_id}`))
                break
            case 'market_comment_edit':
                await bot.api.sendMessage(rudi, ids[id] + ': Редактирование комментария к товару:')
                await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-${id}?w=product-${id}_${data.object.item_id}`))
                break
            case 'market_comment_restore':
                await bot.api.sendMessage(rudi, ids[id] + ': Восстановление комментария к товару:')
                await bot.api.sendMessage(rudi, data.object.text, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-${id}?w=product-${id}_${data.object.item_id}`))
                break
            case 'vkpay_transaction':
                await bot.api.sendMessage(rudi, ids[id] + ': Платёж через VK Pay:')
                await bot.api.sendMessage(rudi, `${data.object.amount} руб. с комментарием: ${data.object.description}`, inlineKeyboard
                    (`https://vk.com/id${data.object.from_id}`, `https://vk.com/market-${id}?w=product-${id}_${data.object.item_id}`))
                break
            case 'confirmation':
                await bot.api.sendMessage(rudi, ids[id] + ': Получен запрос на подтверждение адреса сервера.')
                res.send(confirmationCode)
                await bot.api.sendMessage(rudi, 'Адрес сервера подтвержден.')
                bot.api.sendMessage(rudi, '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
                return
        }
        new DataVK ({
            name: data.type,
            date: new Date,
            dataRecieved: data
        }).save()  
    } catch(e) {
        console.log(e)
        await bot.api.sendMessage(rudi, 'Ошибка обработки события, необходимо связаться с yur0n')
        bot.api.sendMessage(rudi, '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
    }
    res.send('ok')
}


async function code(conversation: any, ctx: any) {
	try {
		ctx.reply('Введи строку подтверждения из VK', {
			parse_mode: "HTML",
			reply_markup: new InlineKeyboard()
										.text('❌ Отменить')
		})
		ctx = await conversation.wait();
		const callback = ctx.update.callback_query
		if (callback?.data == '❌ Отменить') {
			await ctx.answerCallbackQuery();
			await deleteMsg(ctx, callback?.from.id, callback?.message.message_id)
			return;
		}
        confirmationCode = ctx.msg.text
        ctx.reply('Строка для подтверждения сервера сохранена!');
	} catch (e) {
		console.log(e)
		ctx.reply('❌ Ошибка, попробуйте снова!')
	}
}

async function code(conversation: any, ctx: any) {
	try {
		ctx.reply('Введи ID группы', {
			parse_mode: "HTML",
			reply_markup: new InlineKeyboard()
										.text('❌ Отменить')
		})
		ctx = await conversation.wait();
		const callback = ctx.update.callback_query
		if (callback?.data == '❌ Отменить') {
			await ctx.answerCallbackQuery();
			await deleteMsg(ctx, callback?.from.id, callback?.message.message_id)
			return;
		}
        const groupId = ctx.msg.text;
        await ctx.reply('Введи название группы (не имеет значения, любое)');
        ctx = await conversation.wait();
        const groupName = ctx.msg.text;
        ids[groupId] = groupName;
        ctx.reply('Группа добавлена!');
	} catch (e) {
		console.log(e)
		ctx.reply('❌ Ошибка, попробуйте снова!')
	}
}