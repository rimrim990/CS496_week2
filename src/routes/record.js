const express = require('express');
const RecordDAO = require('../DAO/record');
const { getUserById } = require('../DAO/user');
const { verifyToken } = require('../lib/token');

const router = express.Router();
const { insertRecord, getRecordByUserId, deleteRecordById } = RecordDAO;

router.post('/', async (req, res, next) => {
    try {
        const access_token = req.get('access-token');
        const { distance, maxSpeed, time, pathMarkers } = req.body();
        const userObj = verifyToken(access_token);
        if (!getUserById(userObj._id)) throw new Error('UNAUTHORIZED');
        await insertRecord(userObj._id, distance, time, maxSpeed, pathMarkers);
    } catch (err) {
        console.log(err);
        next(err);
    }
    
});

router.delete(`/:recordId(\\d+)`, async (req, res, next) => {
    try {
        let { recordId } = req.params;
        recordId = parseInt(recordId);
        const access_token = req.get('access-token');
        const userObj = verifyToken(access_token);
        if (!userObj) throw new Error("UNAUTHORIZED");
        await deleteRecordById(recordId, userObj._id);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const access_token = req.get('access-token');
        const userObj = verifyToken(access_token);
        if (!userObj) throw new Error('UNAUTHORIZED')
        const groupList = await getRecordByUserId(userObj._id);
        res.json(groupList);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;