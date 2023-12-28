import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    key: 'string',
    data: {},
})

export default mongoose.model('Session', schema)