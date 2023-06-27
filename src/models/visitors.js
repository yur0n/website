import { Schema } from 'mongoose'
import { websiteDb } from '../database/connection.js'

const schema = new Schema({
    ip: 'string',
    visits: 'number',
    firstVisit: 'string',
    lastVisit: 'string'
})

export default websiteDb.model('Visitor', schema)
