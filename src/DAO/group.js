const { Group } = require('../lib/database');

const insertGroup = async (name, memberList) => {
    const group = new Group({
        "name": name,
        "member": memberList
    });
    await group.save();
};

const getAllGroups = async () => {
    const groupList = await Group.find().exec();
    return groupList;
};

const getGroupById = async (id) => {
    const query = { _id: id };
    const group = await Group.findOne(query).exec();
    return group;
};

const getGroupsByUserId = async (userId) => {
    const query = { member: { $contains: userId }};
    const groupList = await Group.find(query).exec();
    return groupList;
};

const getMembersRanking = async (id) => {
    const query = { _id: groupId };
    const memberList = await Group.findOne(query).sort('-member.total').exec();
    return memberList;
};

const updateGroup = async (groupId, user) => {
    const query = { _id: groupId };
    await Group.updateOne(query, { $push: { member: user }});
};

const deleteGroup = async (id) => {
    const query = { _id: id };
    await Group.delete(query);
};

module.exports = {
    insertGroup,
    getGroupById,
    getGroupsByUserId,
    getAllGroups,
    updateGroup,
    deleteGroup,
};