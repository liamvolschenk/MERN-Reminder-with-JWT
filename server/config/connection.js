//requiring the mongoose module
const mongoose = require('mongoose');

//declaring the connection string to my Atlas MongoDB 
const ATLAS_URI = 'mongodb+srv://LiamVolschenk:Fudge040800@cluster0.hbalv.mongodb.net/toDoList?retryWrites=true&w=majority'

mongoose.connect(ATLAS_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports = mongoose.connection;