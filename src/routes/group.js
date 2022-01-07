const express = require('express');
const groupDAO = require('../DAO/group');

const router = express.Router();
const { getAllGroups, insertGroup, getGroupById, getGroupsByUserId, updateGroup, deleteGroup } = groupDAO;

router.get('/', async (req, res, next) => {
    const groupList = await getAllGroups();
    res.send(groupList);
})

router.post('/', async (req, res, next) => {
    const { name, member } = req.body;
    await insertGroup(name, member);
    res.send('');
});

router.get('/:groupId(\\d+)', async (req, res, next) => {
    const { groupId } = req.params;
    const id = parseInt(groupId);
    const group = await getGroupById(id);
    res.send(group);
});

router.get('/list/userId(\\d+)', async (req, res, next) => {
    const { userId } = req.params;
    const id = parseInt(usrId);
    const groupList = await getGroupsByUserId(id);
    res.send(groupList);
});

router.post('/groupId(\\d+)', async (req, res, next) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    const gId = parseInt(groupId);
    const uId = parseInt(userId);
    updateGroup(gId, uId);
    res.send('');
});

router.delete('/groupId(\\d+)', async (req, res, next) => {
    const { groupId } = req.params;
    const id = parseInt(groupId);
    deleteGroup(id);
    res.send('');
});

module.exports = router;

