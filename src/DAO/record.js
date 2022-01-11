const { Record } = require('../lib/database');

const insertRecord = async (userId, distance, time, maxSpeed, pathMarks) => {
    const record = new Record({
        "userId": userId,
        "distance": distance,
        "time": time,
        "maxSpeed": maxSpeed,
        "pathMarks": pathMarks,
    });
    await record.save();
    return record;
}

const getRecordByUserId = async (userId) => {
    const query = { userId: userId };
    const recordList = await Record.find(query).exec();
    return groupList;
}

const deleteRecordById = async (recordId, userId) => {
    const query = { _id: recordId, userId: userId };
    await Record.findOneAndDelete(query).exec();
}

module.exports = {
    insertRecord,
    getRecordByUserId,
    deleteRecordById,
};