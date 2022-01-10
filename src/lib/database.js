const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { generateToken } = require('./token');
require('dotenv').config();

const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
	_id: { type: Number, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	displayName: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	photoUrl: String,
	totalDistance: { type: Number, default: 0 },
	joinedAt: { type: String, required: true, default: () => new Date().toJSON().slice(0, 10) }
});
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: '_id',
	startAt: 1,
	increment: 1
});
userSchema.method.generateToken = function () {
	// JWT 에 담을 내용
	const payload = {
		_id: this._id,
		username: this.username,
		password: this.password,
	};

	return generateToken(payload);
}

const groupSchema = new mongoose.Schema({
	_id: { type: Number, required: true, unique: true },
	name: { type: String, required: true },
	info: { type: String, required: true },
	owner: {
		type: {
			_id: Number,
			username: String,
			displayName: String,
			photoUrl: String,
			totalDistance: Number,
		}, required: true
	},
	member: {
		type: [{
			_id: Number,
			username: String,
			displayName: String,
			photoUrl: String,
			totalDistance: Number,
		}], required: true
	},
	createdAt: { type: String, required: true, default: () => new Date().toJSON().slice(0, 10) },
	groupCode: { type: String, required: true, default: () => Math.random().toString(36).slice(2, 8) }
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
	mongoose,
	User,
	Group,
	Running,
};
