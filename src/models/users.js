import mongoose from "mongoose"

export default mongoose.connection.db.collection(
	"users",
);

// const schema = new mongoose.Schema({
//     key: 'string',
//     data: {},
// })

// export default mongoose.model('User', schema)