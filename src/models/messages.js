import mongoose from 'mongoose'

const dataBase = new mongoose.Schema ({
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

export default mongoose.model('vkmessage', dataBase)
