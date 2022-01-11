const express = require('express');
const { getGroupsByUserId, updateGroupMember } = require('../DAO/group');
const userDAO = require('../DAO/user');
const { verifyToken } = require('../lib/token');

const router = express.Router();
const {insertUser, getAllUsers, updateUser, updateDistance, getUserById, getUserByUsername, deleteUser} = userDAO;

// get user list
router.get('/', async function(req, res, next) {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// insert user
router.post(`/`, async function(req, res, next) {
  try {
    const { username, password, displayName, photoUrl } = req.body;
    await insertUser(username, password, displayName, photoUrl);
    res.send('');
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// send data
router.post('/data', async (req, res, next) => {
  try {
      const { distance } = req.body;
      const access_token = req.get('access-token');
      const decoded = await verifyToken(access_token);

      const userObj = await getUserById(decoded._id);
      if (!userObj) throw new Error("UNAUTHORIZED");

      const user = {
          _id: userObj._id,
          username: userObj.username,
          displayName: userObj.displayName,
          totalDistance: userObj.totalDistance
      };
      const result = await updateDistance(user._id, distance);
      console.log(result);
      res.json(result);
  } catch (err) {
      console.log(err);
      return next(err);
  }
});

// update user
router.post(`/:userId(\\d+)`, async function(req, res, next) {
  try {
    const { userId } = req.params;
    const { displayName } = req.body;
    const id = parseInt(userId);
    await updateUser(id, displayName);
    res.send('');
  } catch (err) {
    console.log(err);
    next(err);
  }
  
}); 

// get user by id
router.get(`/:userId(\\d+)`, async function(req, res, next) {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get user by name
router.get(`/:userName`, async function(req, res, next) {
  try {
    const { userName } = req.params;
  const user = await getUserByUsername(userName);
  res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
})


// delete user
router.delete(`/:userId(\\d+)`, async function(req, res, next) {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    await deleteUser(id);
    res.json('deletion success!');
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
