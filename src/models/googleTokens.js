import { Schema } from 'mongoose'
import { websiteDb } from '../database/connection.js'

const schema = new Schema ({
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    },
    expiry_date: {
        type: Number
    },
    token_type: {
        type: String
    },
    scope: {
        type: Array
    }
})

export default websiteDb.model('googleToken', schema)