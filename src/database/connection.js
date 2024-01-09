import mongoose from 'mongoose'
const login = process.env.MONGODB_LOGIN
const pass = process.env.MONGODB_PASS

await mongoose.connect(`mongodb+srv://${login}:${pass}@cluster0.0na8y.mongodb.net/Website?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})
