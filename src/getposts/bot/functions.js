import axios from "axios"

export async function deleteMsg(ctx, chat, msg) {
	try {
		await ctx.api.deleteMessage(chat, msg)
	} catch (e) {}
}

export async function deleteMsgTime(ctx, chat, msg, time = 2500) {
	await new Promise(resolve => setTimeout(resolve, time))
	try {
		await ctx.api.deleteMessage(chat, msg)
	} catch (e) {}
}

export async function replyAndDel(ctx, text, time = 2500) {
	const msg = await ctx.reply(text)
	await new Promise(resolve => setTimeout(resolve, time))
	try {
		await ctx.api.deleteMessage(msg.chat.id, msg.message_id)
	} catch (e) {}
}

export async function isAdmin(ctx, chat_id) {
	const token = ctx.session.bots[ctx.session.current.bot].token
	const botId = ctx.session.bots[ctx.session.current.bot].id
	return axios.post(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${chat_id}&user_id=${botId}`)
		.then(res => res.data.result.status === 'administrator' || res.data.result.status === 'moderator')
		.catch(() => false)
}

export async function checkToken(ctx) {
	const token = ctx.message.text
	const ok = token.match(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/)
	if (!ok) return false
	return axios.get(`https://api.telegram.org/bot${token}/getMe`)
		.then(res => {
			const data = res.data.result
			ctx.session.bots[data.username] = { name: data.first_name || data.username, id: data.id,
				token: token, options: { pause: false, links: 0, time: 1 }, sources: { youtube: [], vk: [] }, targets: [] }
			return true
		})
		.catch(() => false)
}

export function listBots (ctx, range, submenu) {
	const items = Object.keys(ctx.session.bots)
	let i = 0
	// if (!Array.isArray(items)) items = Object.keys(items)
	// if (items.length < 2) items.push('Free Bot slot')
	items.forEach(el => {
		if (i % 2) {
			range
			.text('🤖   ' + el, ctx => {
				ctx.session.current.bot = el
				ctx.menu.nav(submenu)
			}).row()
			return i++
		}
		range
		.text('🤖  ' + el, ctx => {
			ctx.session.current.bot = el
			ctx.menu.nav(submenu)
		})
		i++
	});
}

export function listTargets (ctx, range) {
	const items = ctx.session.bots[ctx.session.current.bot].targets
	let i = 0
	if (!Array.isArray(items)) items = Object.keys(items)
	items.forEach(el => {
		if (i % 2) {
			range
			.text('❌ ' + el, ctx => {
				const index = items.indexOf(el)
				ctx.session.bots[ctx.session.current.bot].targets.splice(index, 1)
				ctx.menu.update()
			}).row()
			return i++
		}
		range
		.text('❌ ' + el, ctx => {
			const index = items.indexOf(el)
			ctx.session.bots[ctx.session.current.bot].targets.splice(index, 1)
			ctx.menu.update()
		})
		i++
	});
}

export function listSources (ctx, range) {
	const items = ctx.session.bots[ctx.session.current.bot].sources[ctx.session.current.a]
	let i = 0
	if (!Array.isArray(items)) items = Object.keys(items)
	items.forEach(el => {
		if (i % 2) {
			range
			.text('❌ ' + el, ctx => {
				const index = items.indexOf(el)
				ctx.session.bots[ctx.session.current.bot].sources[ctx.session.current.a].splice(index, 1)
				ctx.menu.update()
			}).row()
			return i++
		}
		range
		.text('❌ ' + el, ctx => {
			const index = items.indexOf(el)
			ctx.session.bots[ctx.session.current.bot].sources[ctx.session.current.a].splice(index, 1)
			ctx.menu.update()
		})
		i++
	});
}

export function options(ctx, range) {
	range
	.text(
		ctx => ctx.session.bots[ctx.session.current.bot].options.pause ? '✅ Pause Bot' : '⏹️ Pause Bot',
		ctx => {
			ctx.session.bots[ctx.session.current.bot].options.pause = !ctx.session.bots[ctx.session.current.bot].options.pause
			ctx.menu.update()
		}
	)
	.row()
	.text(
		ctx => {
			return '🔗 Links rule: ' + (() => {
				const links = ctx.session.bots[ctx.session.current.bot].options.links
				if(links === 0) return 'Keep links in posts     | ✅⏹️⏹️'
				if(links === 1) return 'Delete links in posts | ⏹️✅⏹️'
				if(links === 2) return 'Skip posts with links | ⏹️⏹️✅'
			})()
		},
		ctx => {
			const links = ctx.session.bots[ctx.session.current.bot].options.links
			ctx.session.bots[ctx.session.current.bot].options.links = (links + 1) % 3
			ctx.menu.update()
		}
	)
	.row()
	.text(ctx => {
		return '⏳ Time rule: ' + (() => {
			const time = ctx.session.bots[ctx.session.current.bot].options.time
			if(time === 0) return 'Every 10 minutes       | ✅⏹️⏹️'
			if(time === 1) return 'Every 1 hour                | ⏹️✅⏹️'
			if(time === 2) return 'Every 5 hours             | ⏹️⏹️✅'
		})()
	},
		ctx => {
			const time = ctx.session.bots[ctx.session.current.bot].options.time
			ctx.session.bots[ctx.session.current.bot].options.time = (time + 1) % 3
			ctx.menu.update()
		}
	)
}
