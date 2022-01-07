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
    const id = parseInt(userId);
    const query = { member: { $elemMatch: { _id: id }}};
    const groupList = await Group.find(query).exec();
    return groupList;
};

const getMembersRanking = async (id) => {
    const query = { _id: groupId };
    const memberList = await Group.findOne(query).sort('-member.total').exec();
    return memberList;
};

const updateGroupMember = async (groupId, userId, username, displayName) => {
    const query = { _id: groupId };
    await Group.updateOne(query, { $push: { member: {
        "_id": userId,
        "username": username,
        "displayName": displayName,
    }}});
};

const updateGroupName = async (groupId, name) => {
    const query = { _id: groupId };
    await Group.updateOne(query, { $set: {name: name }});
}

const deleteGroup = async (id) => {
    const query = { _id: id };
    await Group.delete(query);
};

/* TODO */
const deleteMemberById = async (id) => {
    const query = { member: { $elemMatch: { _id: id }}};
    await Group.findAndUpdate(query, {$pop: { member: {$elemMatch: {_id: id}}}});
}

module.exports = {
    insertGroup,
    getGroupById,
    getGroupsByUserId,
    getAllGroups,
    updateGroupMember,
    updateGroupName,
    deleteGroup,
};