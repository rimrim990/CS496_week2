const { Running } = require('../lib/database');

const insertRunning = async (userId) => {
    const running = new Running({
            "userId": userId
    });
    await running.save();
}

const updateDailyById = async (id, daily) => {
    const query = { _id: id };
    await Running.updateOne(query, { $set: { daily: daily }});
};

const updateMonthlyById = async (id, monthly) => {
    const query = { _id: id };
    await Running.updateOne(query, { $set: { monthly: monthly }});
};

const updateTotalById = async (id, total) => {
    const query = { _id: id };
    await Running.updateOne(query, { $set: { total: total }});
};

module.exports = {
    insertRunning,
    updateDailyById,
    updateMonthlyById,
    updateTotalById,
};