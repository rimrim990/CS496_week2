const { User } = require('../lib/database');

const insertUser = async (name, photoUrl) => {
	try {
		const user = User({
			"name": name,
			"photoUrl": photoUrl
		});
		await user.save();
	} catch (err) {
		console.log(err);
	}
};

const getAllUsers = async () => {
	try {
		const users = await User.find().exec();
		return users;
	} catch (err) {
		console.log(err);
	}	
};

const getUserById = async (id) => {
	try {
		const query = { _id: id };
		const user = await User.findOne(query).exec();
		
		return user;
	} catch (err) {
		console.log(err);
	}
	
};

const getUserByName = async (name) => {
	try {
		const query = { name: name };
		const user = await User.findOne(query).exec();
		
		return user;
	} catch (err) {
		console.log(err);
	}
};

const updateUser = async (id, name) => {
	try {
		const query = { _id: id };
		await User.update(query, { $set: { name: name }});
	} catch (err) {
		console.log(err);
	}
};

const deleteUser = async (id) => {
	try {
		const query = { _id: id };
		await User.remove(query);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	insertUser,
	getAllUsers,
	getUserById,
	getUserByName,
	updateUser,
	deleteUser,
};
