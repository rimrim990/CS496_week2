const { User } = require('../lib/database');

const insertUser = async (username, password, displayName, photoUrl) => {
	const user = User({
		"username": username,
		"password": password,
		"displayName": displayName,
		"photoUrl": photoUrl
	});
	await user.save();
	return user._id;
};

const getAllUsers = async () => {
	const users = await User.find().exec();
	return users;
};

const getUserById = async (id) => {
	const query = { _id: id };
	const user = await User.findOne(query).exec();	
	return user;
};

const getUserByUsername = async (username) => {
	const query = { username: username };
	const user = await User.findOne(query).exec();
	return user;
};

const updateUser = async (id, displayName) => {
	const query = { _id: id };
	await User.update(query, { $set: { displayName: displayName }});
};

const updateDistance = async (id, distance) => {
	const query = { _id: id };
	return await User.findOneAndUpdate(query, { $inc: { totalDistance: distance }}).exec();
}

const deleteUser = async (id) => {
	const query = { _id: id };
	await User.remove(query);
};

module.exports = {
	insertUser,
	getAllUsers,
	getUserById,
	getUserByUsername,
	updateUser,
	deleteUser,
	updateDistance,
};
