const { Record } = require('../lib/database');

const insertRecord = async (userId, distance, time, maxSpeed, lan, lng, info) => {
    const record = new Record({
        "userId": userId,
        "distance": distance,
        "time": time,
        "maxSpeed": maxSpeed,
        "lan": lan,
        "lng": lng,
        "info": info,
    });

    await record.save();
    return record;
}

const getAllRecords = async () => {
    const recordList = await Record.find().exec();
    return recordList;
}

const getRecordByUserId = async (userId) => {
    const query = { userId: userId };
    const recordList = await Record.find(query).exec();
    console.log(recordList);
    return recordList;
}

const deleteRecordById = async (recordId, userId) => {
    const query = { _id: recordId, userId: userId };
    await Record.findOneAndDelete(query).exec();
}

module.exports = {
    insertRecord,
    getRecordByUserId,
    deleteRecordById,
    getAllRecords,
};