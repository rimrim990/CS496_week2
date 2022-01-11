const { Group } = require('../lib/database');

const insertGroup = async (name, info, groupOwner, memberList) => {
    const group = new Group({
        "name": name,
        "info": info,
        "owner": groupOwner,
        "member": memberList
    });
    await group.save();
    return group;
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
    const query = { member: { $elemMatch: { _id: id } } };
    const groupList = await Group.find(query).exec();
    return groupList;
};

const getMembersRanking = async (id) => {
    const query = { _id: groupId };
    const memberList = await Group.findOne(query).sort('-member.total').exec();
    return memberList;
};

const updateGroupMember = async (groupName, groupCode, userId, username, displayName, totalDistance) => {
    const query = { name: groupName, groupCode: groupCode };

    console.log("update member : " + totalDistance);
    const dup = await Group.findOne({'name': groupName, 'groupCode': groupCode, 'member._id': userId});
    if (dup) {
        throw new Error("UNAUTHORIZED");
    }

    await Group.updateOne(query, {
        $push: {
            member: {
                "_id": userId,
                "username": username,
                "displayName": displayName,
                "totalDisatnce": totalDistance
            }
        }
    });
    const group = await Group.findOne(query).exec();
    return group;
};

const updateGroupName = async (groupId, name) => {
    const query = { _id: groupId };
    await Group.updateOne(query, { $set: { name: name } });
}

const deleteGroup = async (gId) => {
    const query = { _id: gId };
    await Group.findOneAndDelete(query);
};

/* TODO */
const deleteMemberById = async (uId, gId) => {
    const query = { _id: gId, member: { $elemMatch: { _id: uId } } };
    await Group.findAndUpdate(query, { $pop: { member: { $elemMatch: { _id: id } } } });
}

module.exports = {
    insertGroup,
    getGroupById,
    getGroupsByUserId,
    getAllGroups,
    updateGroupMember,
    updateGroupName,
    deleteGroup,
    deleteMemberById,
};