import mongoose from "mongoose"
console.log(mongoose.connection.db)
export default mongoose.connection.db.collection(
	"users",
);