import mongoose from 'mongoose'
const login = process.env.MONGODB_LOGIN
const pass = process.env.MONGODB_PASS

await mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})
