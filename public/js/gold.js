const nameForm = document.querySelector('form')
const input = document.querySelector('#inputId')
const message = document.querySelector('#message0')
const message1 = document.querySelector('#message1')

function isCheck() {
    let goodId = document.querySelector('input[name="buy"]:checked').id
    switch (goodId) {
        case 'buy1': return 360
        case 'buy2': return 191
        case 'buy3': return 254
        case 'buy4': return 362
    }
}

nameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let bonus = isCheck()
    if(!bonus || !input.value) return message.textContent = 'Выберите товар и введите имя'
    message.textContent = `Спасибо за покупку, ${input.value}! Вам были начислены бонусы.`
    message1.textContent = "Для просмотра баланса бонусов, отправьте GOLDENBOT'у своё имя."
    setTimeout( () => {
        message.textContent = ` `
        message1.textContent = ` `
    }, 8000) 
    fetch(`/api/goldSilent?bonus=${bonus}&name=${input.value}`)
})
