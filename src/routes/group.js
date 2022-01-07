const express = require('express');
const groupDAO = require('../DAO/group');

const router = express.Router();
const { getAllGroups, insertGroup, getGroupById, getGroupsByUserId, updateGroup, deleteGroup } = groupDAO;

router.get('/', async (req, res, next) => {
    try {
        const groupList = await getAllGroups();
        res.send(groupList);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, member } = req.body;
        await insertGroup(name, member);
        res.send('');
    } catch (err) {
        console.log(err);
        return next(err);
    } 
});

router.get('/:groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const id = parseInt(groupId);
        const group = await getGroupById(id);
        res.send(group);
    } catch (err) {
        console.log(err);
        return next(err);
    }  
});

router.get('/list/userId(\\d+)', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const id = parseInt(usrId);
        const groupList = await getGroupsByUserId(id);
        res.send(groupList);
    } catch (err) {
        console.log(err);
        next(err);
    } 
});

router.post('/groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const { userId } = req.body;
        const gId = parseInt(groupId);
        const uId = parseInt(userId);
        updateGroup(gId, uId);
        res.send('');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.delete('/groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
    const id = parseInt(groupId);
    deleteGroup(id);
    res.send('');
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

module.exports = router;

