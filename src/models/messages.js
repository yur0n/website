import mongoose from 'mongoose'

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

export default mongoose.model('vkmessage', dataBase)
