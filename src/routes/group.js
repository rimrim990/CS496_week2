const express = require('express');
const groupDAO = require('../DAO/group');

const router = express.Router();
const { getAllGroups, insertGroup, getGroupById, getGroupsByUserId, 
    updateGroupMember, updateGroupName, deleteGroup, deleteMemberById } = groupDAO;

// get group list
router.get('/', async (req, res, next) => {
    try {
        const groupList = await getAllGroups();
        res.send(groupList);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

// create group
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

// get group by group id
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

// get groups by user id
router.get('/list/:userId(\\d+)', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const id = parseInt(userId);
        const groupList = await getGroupsByUserId(id);
        res.send(groupList);
    } catch (err) {
        console.log(err);
        next(err);
    } 
});

// update group title
router.post('/name/:groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const { name } = req.body;
        const gId = parseInt(groupId);
        updateGroupName(gId, name);
        res.send('update success!');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// update group member
router.post('/member/:groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const { _id, username, displayName } = req.body;
        const gId = parseInt(groupId);
        const uId = parseInt(_id);
        updateGroupMember(gId, uId, username, displayName);
        res.send('update success!');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// delete a group
router.delete('/:groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const id = parseInt(groupId);
        deleteGroup(id);
        res.send('delection success!');
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// delete a member
router.delete('/member/:userId(\\d+)', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const uId = parseInt(userId);
        deleteMemberById(uId);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

module.exports = router;

