const { Running } = require('../lib/database');

const getAllRunnings = async () => {
    const runnings = await Running.find().exec();
    return runnings;
};

const insertRunning = async (userId) => {
    const running = new Running({
        "userId": userId
    });
    await running.save();
}

const updateDailyById = async (id, distance) => {
    const query = { _id: id };
    await Running.updateOne(query, { $set: { daily: distance } });
};

const updateMonthlyById = async (id, distance) => {
    const query = { _id: id };
    await Running.updateOne(query, { $set: { monthly: distance } });
};

const updateTotalById = async (id, distance) => {
    const query = { _id: id };
    const user = await Running.findOne(query).exec();
    distance *= 1
    await Running.updateOne(query, { $set: { total: (user.total + distance) } });
};

module.exports = {
    getAllRunnings,
    insertRunning,
    updateDailyById,
    updateMonthlyById,
    updateTotalById,
};