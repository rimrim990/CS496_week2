const express = require('express');
const runningDAO = require('../DAO/running');
const { verifyToken } = require('../lib/token');
const { getUserById } = require('../DAO/user');

const router = express.Router();
const { getAllRunnings, insertRunning, updateDailyById, updateMonthlyById, updateTotalById } = runningDAO;

// get all running data
router.get('/', async (req, res, next) => {
    try {
        const runningList = await getAllRunnings();
        res.send(runningList);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

// send data
// 뛴 기록 저장 (1회분)
router.post('/data', async (req, res, next) => {
    try {
        const { distance } = req.body;
        const access_token = req.get('access-token');
        const decoded = await verifyToken(access_token);
        console.log(distance);

        const userObj = await getUserById(decoded._id);
        if (!userObj) throw new Error("UNAUTHORIZED");

        const user = {
            _id: userObj._id,
            username: userObj.username,
            displayName: userObj.displayName,
            photoUrl: userObj.photoUrl
        };
        updateTotalById(user._id, distance)
        res.send("data send success");
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

module.exports = router;