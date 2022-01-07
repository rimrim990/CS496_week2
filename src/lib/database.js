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
	name: { type: String, required: true },
	photoUrl: String,
	createdAt: { type: Date, required: true, default: Date.now } 
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
	member: { type: [Number], required: true },
	createdAt: { type: Date, required: true, default: () => Date.now }
});
groupSchema.plugin(autoIncrement.plugin, {
	model: 'Group',
	field: '_id',
	startAt: 1,
	increment: 1
});

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);

module.exports = {
	User,
	Group,
};
