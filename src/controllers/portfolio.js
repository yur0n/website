const bot = process.env.WEBSITE_BOT_TOKEN;
const chatId = process.env.WEBSITE_CHAT_ID;

export default async (req, res) => {
	const { subject, email, message } = req.body;
	if (!subject || !email || !message) {
		return res.status(400).send('All fields are required');
	}
	const messageText = `Email: ${email} | Subject: ${subject} | Message: ${message}`;
	const response = await fetch(`https://api.telegram.org/bot${bot}/sendMessage?chat_id=${chatId}&text=${messageText}`)
		.then(r => r.json())
		.catch(() => { ok: false });
	res.send({ ok: response.ok });
}
