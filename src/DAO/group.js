const { Group } = require('../lib/database');

const insertGroup = async (name, member) => {
    try {
        const group = new Group({
            "name": name,
            "member": member
        });
        await group.save();
    } catch (err) {
        console.log(err);
    }
};

const getAllGroups = async () => {
    try {
        const groupList = await Group.find().exec();
        return groupList;
    } catch (err) {
        console.log(err);
    }
}

const getGroupById = async (id) => {
    try {
        const query = { _id: id };
        const group = await Group.findOne(query).exec();

        return group;
    } catch(err) {
        console.log(err);
    }
};

const getGroupsByUserId = async (userId) => {
    try {
        const query = { member: { $contains: userId }};
        const groupList = await Group.find(query).exec();

        return groupList;
    } catch (err) {
        console.log(err);
    }
};

const updateGroup = async (groupId, userId) => {
    try {
        const query = { _id: groupId };
        await Group.update(query, { $push: { member: userId }}, done);
    } catch (err) {
        console.log(err);
    }
};

const deleteGroup = async (id) => {
    try {
        const query = { _id: id };
        await Group.delete(query);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    insertGroup,
    getGroupById,
    getGroupsByUserId,
    getAllGroups,
    updateGroup,
    deleteGroup,
};