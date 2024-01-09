import mongoose from "mongoose"

// export default mongoose.connection.db.collection(
// 	"users",
// );
mongoose.set('strictQuery', true)
const schema = new mongoose.Schema({
    key: 'string',
    value: {},
})

export default mongoose.model('User', schema)