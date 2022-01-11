const express = require('express');
const groupDAO = require('../DAO/group');
const { getUserById } = require('../DAO/user');
const { verifyToken } = require('../lib/token');

const router = express.Router();
const { getAllGroups, insertGroup, getGroupById, getGroupsByUserId,
    updateGroupMember, updateGroupName, deleteGroup, deleteMemberById } = groupDAO;

// get group list
// 모든 그룹 가져오기
router.get('/', async (req, res, next) => {
    try {
        const groupList = await getAllGroups();
        res.send(groupList);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

// create group (initialize)
// 그룹 생성하기 - 생성 요청자가 소유자가 됨
router.post('/', async (req, res, next) => {
    try {
        const { name, info } = req.body;
        const access_token = req.get('access-token');
        const decoded = await verifyToken(access_token);

        const userObj = await getUserById(decoded._id);
        if (!userObj) throw new Error("UNAUTHORIZED");

        const groupOwner = {
            _id: userObj._id,
            username: userObj.username,
            displayName: userObj.displayName,
            photoUrl: userObj.photoUrl,
            totalDistance: userObj.totalDistance,
        };
        const result = await insertGroup(name, info, groupOwner, [groupOwner]);
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// get group by group id
// 그룹 아이디로 그룹 가져오기
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
// user가 속한 모든 그룹 가져오기
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

// get groups by user id
// user가 속한 모든 그룹 가져오기
router.get('/list', async (req, res, next) => {
    try {
        const access_token = req.get('access-token');
        const userObj = await verifyToken(access_token);

        console.log(userObj);

        if (!userObj) throw new Error('UNAUTHORIZED');

        const groupList = await getGroupsByUserId(userObj._id);
        res.json(groupList);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// get user by user id
router.get("/user/:userId(\\d+)", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const uid = parseInt(userId);

        const userObj = await getUserById(uid);
        res.json(userObj);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// update group title
// 그룹 이름 수정하기
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
// 그룹 가입하기
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

// join with group code
router.post('/join', async (req, res, next) => {
    try {
        const access_token = req.get('access-token');
        const { name, code } = req.body;

        const decoded = await verifyToken(access_token);
        const userObj = await getUserById(decoded._id);
        if (!userObj) throw new Error("UNAUTHORIZED");

        const joinUser = {
            _id: userObj._id,
            username: userObj.username,
            displayName: userObj.displayName,
            photoUrl: userObj.photoUrl,
            totalDistance: userObj.totalDistance
        };
        const result = await updateGroupMember(name, code, joinUser._id, joinUser.username, joinUser.displayName, joinUser.totalDistance);
        console.log(joinUser.totalDistance)
        res.send(result);
        // res.send('join success!');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// delete a group
/* TODO: 그룹 소유자만 지울 수 있도록 */
router.delete('/:groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const gId = parseInt(groupId);
        const { _id } = await verifyToken(req.get('access-token'));
        const groupObj = await getGroupById(gId);

        if (!groupObj) {
            throw new Error('NOT FOUND');
        }

        if (groupObj.owner._id === _id) {
            deleteGroup(gId);
            res.send('delection success!');
        } else {
            throw new Error('UNAUTHORIZED');
        }
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// delete a member
// 그룹 나가기
/* TODO: 선택된 그룹에서 탈퇴하기 */
router.delete('/member/:groupId(\\d+)', async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const gId = parseInt(groupId);
        const access_token = req.get('access-token');
        const userObj = await verifyToken(access_token);
        const userId = userObj._id;
        await deleteMemberById(userId, groupId);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

module.exports = router;

