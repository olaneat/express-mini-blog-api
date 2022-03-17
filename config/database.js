const mongoose = require("mongoose")
const { MONGO_URI } = process.env

exports.connect = () => {
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//useCreateIndex: true,
			//usefindAndModify: true,

		})
		.then(() => {
			console.log('connection to Db Successful')
		})
		.catch((err) => {
			console.log('Connection to Db Failed', err)
			process.exit(1)
		})
}