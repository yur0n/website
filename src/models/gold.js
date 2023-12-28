import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: 'string',
    bonus: 'number',
    chat: 'number'
})

export default mongoose.model('Golduser', schema)
