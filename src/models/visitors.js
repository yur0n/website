import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    ip: 'string',
    visits: 'number',
    firstVisit: 'string',
    lastVisit: 'string'
})

export default mongoose.model('Visitor', schema)
