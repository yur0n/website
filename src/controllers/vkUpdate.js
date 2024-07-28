import { Bot, session, InlineKeyboard } from 'grammy'
import { conversations, createConversation } from '@grammyjs/conversations';
import { freeStorage } from "@grammyjs/storage-free";
import DataVK from '../models/messages.js';

const bot = new Bot(process.env.BOT_VK_RUDI)
bot.use(session({ 
	initial: () => ({ ids: { '124949590': 'Травница' }, confirmationCode: '' }),
    storage: freeStorage(bot.token)
})) 
bot.use(conversations());
bot.use(createConversation(addGroup));
bot.use(createConversation(addCode));
bot.api.setMyCommands([{ command: 'start', description: 'Меню' } ]);

const replyMenu = (ctx) => {
    ids = ctx.session.ids
    confirmationCode =  ctx.session.confirmationCode
    return ctx.reply('Главное меню', {
        reply_markup: new InlineKeyboard()
        .text('Добавить группу')
        .text('Добавить код подтверждения')
    })
}

let confirmationCode = ''
let ids = {
    '124949590': 'Травница'
}

bot.command('start',  async ctx => {
    await ctx.reply('Я буду автоматически присылать новую информацию о твоей группе.')
    replyMenu(ctx)
    return
})

bot.on('callback_query', async (ctx, next) => {
    ids = ctx.session.ids
    confirmationCode =  ctx.session.confirmationCode
	await ctx.answerCallbackQuery();
	const callback = ctx.update.callback_query;
	if (callback?.data == 'Добавить группу') {
		await ctx.conversation.enter('addGroup')
	}
	if (callback?.data == 'Добавить код подтверждения') {
        await ctx.conversation.enter('addCode')
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
        .url('Подробнее', url2)
    }
}  

export default async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const restricted = [441232274] // const restricted = [441232274, ...Object.values(ids).map(id => '-' + id)]
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


async function addCode(conversation, ctx) {
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
			return replyMenu(ctx);
		}
        confirmationCode = ctx.msg.text
        ctx.session.confirmationCode = ctx.msg.text
        await ctx.reply('Строка для подтверждения сервера сохранена!');
        replyMenu(ctx)
	} catch (e) {
		console.log(e)
		ctx.reply('❌ Ошибка, попробуйте снова!')
	}
}

async function addGroup(conversation, ctx) {
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
			return replyMenu(ctx);
		}
        const groupId = ctx.msg.text;
        await ctx.reply('Введи название группы (не имеет значения, любое)');
        ctx = await conversation.wait();
        const groupName = ctx.msg.text;
        ids[groupId] = groupName;
        ctx.session.ids[groupId] = groupName;
        await ctx.reply('Группа добавлена!');
        replyMenu(ctx)
	} catch (e) {
		console.log(e)
		ctx.reply('❌ Ошибка, попробуйте снова!')
	}
}