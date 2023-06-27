import axios from 'axios'

const bot = '5943964873:AAHiO7fSt4ia69HJ8GEHFt-kJHAR7sr6hHU' 
const access_token = 'vk1.a.-BloNcGlTuZAZHLHx6RXl-yCjanlCOkRCeybLdz59bILKDbueQgba4vSl8uLdpfsyXYymth4tpHt7q7dqmKO8onJFsgpm_mEOsJNwYXC-WEGIncwS8OOuZY0BNIt5VzypY5e4H-bUu_tzWToPGBpufhYxt90YtrbbIixyJhsSKy61gRWaB-SBR0jFnEygOlp5dKUMWLmY66sZ85-LaLdhA'
const owner_id = '-93856576'
const chat_id = '-1001670917181'


let postId = 0
const parserVK = () => {
    axios.get("https://api.vk.com/method/wall.get", {
        params: {
            domain: 'sunnypyongyang',
            access_token,
            count: 2,
            v: 5.131,
        }
    })
    .then(res => {
        data = res.data.response.items
        res.data.response.items.forEach(item => {
	    if (item.marked_as_ads) return
            if (item.is_pinned) return
            else if (item.id <= postId) return
            else {
                postId = item.id
                
                const caption = item.text
                let photos
                let photoWidth = 0
                let photo
                if (item.attachments[0].photo) photos = item.attachments[0].photo.sizes 
                else if (item.attachments[0].video.image) photos = item.attachments[0].video.image
                else if (caption.length > 1024 && photos) {
                    axios.post(`https://api.telegram.org/bot${bot}/sendMessage`, {chat_id, text: caption})
                    .catch((e) => console.log(e.response.data))
                    return
                } else {
                    axios.post(`https://api.telegram.org/bot${bot}/sendMessage`, {chat_id, text: caption})
                    .catch((e) => console.log(e.response.data))
                    return
                }

                photos.forEach(el => {
                    if (el.width > photoWidth) {
                        photoWidth = el.width
                        photo = el.url
                    }
                })
                axios.post(`https://api.telegram.org/bot${bot}/sendPhoto`, {chat_id, photo, caption})
                .catch((e) => console.log(e.response.data))
            }
        });
    })
    .catch((e) => console.log(e))   
}

setInterval(parserVK, 10000000)

