import { Schema } from 'mongoose'
import { websiteDb } from '../database/connection.js'

const dataBase = new Schema ({
    date: {
        type: String
    },
    name: {
        type: String
    },
    dataRecieved: {
        type: Object
    }
})

export default websiteDb.model('vkmessage', dataBase)
