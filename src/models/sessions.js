import { Schema } from 'mongoose'
import { telegramDb } from '../database/connection.js'

const schema = new Schema({
    key: 'string',
    data: {},
})

export default telegramDb.model('Session', schema)