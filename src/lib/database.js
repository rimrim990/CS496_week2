const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();

const { MONGO_URI } = process.env;
const connection = mongoose.connect(MONGO_URI)
.then(() => {
	console.log("Connected to MongoDB");
})
.catch((err) => {
	console.log(err);
});

autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
	_id: { type: Number, required: true, unique: true },
	username: { type: String, required: true , unique: true },
	displayName: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	photoUrl: String,
	joinedAt: { type: String, required: true, default: () => new Date().toJSON().slice(0,10) } 
});
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: '_id',
	startAt: 1,
	increment: 1
});

const groupSchema = new mongoose.Schema({
	_id: { type: Number, required: true, unique: true },
	name: { type: String, required: true },
	member: { type: [{
		_id: Number,
		username: String,
		displayName: String,
		photoUrl: String,
	}], required: true },
	createdAt: { type: String, required: true, default: () => new Date().toJSON().slice(0,10) }
});
groupSchema.plugin(autoIncrement.plugin, {
	model: 'Group',
	field: '_id',
	startAt: 1,
	increment: 1
});

const runningSchema = new mongoose.Schema({
	_id: { type: Number, required: true, unique: true },
	userId: { type: Number, required: true, unique: true },
	daily: Number,
	montly: Number,
	total: Number
});
runningSchema.plugin(autoIncrement.plugin, {
	model: 'Running',
	field: '_id',
	startAt: 1,
	increment: 1
})

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Running = mongoose.model('Running', runningSchema);

module.exports = {
	User,
	Group,
	Running,
};
