import mongoose from 'mongoose'

const schema = new Schema({
    key: 'string',
    data: {},
})

export default mongoose.model('Session', schema)