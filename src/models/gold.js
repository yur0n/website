import { Schema } from 'mongoose'
import { websiteDb } from '../database/connection.js'

const schema = new Schema({
    name: 'string',
    bonus: 'number',
    chat: 'number'
})

export default websiteDb.model('Golduser', schema)
