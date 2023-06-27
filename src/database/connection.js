import mongoose from 'mongoose'
const login = process.env.MONGODB_LOGIN
const pass = process.env.MONGODB_PASS

export const websiteDb = mongoose.createConnection(`mongodb+srv://${login}:${pass}@cluster0.0na8y.mongodb.net/Website?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})

export const telegramDb = mongoose.createConnection(`mongodb+srv://${login}:${pass}@cluster0.0na8y.mongodb.net/Telegram?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})