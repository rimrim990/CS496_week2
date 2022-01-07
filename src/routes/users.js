const express = require('express');
const userDAO = require('../DAO/user');

const router = express.Router();
const {insertUser, getAllUsers, updateUser, getUserById, getUserByName} = userDAO;

// get user list
router.get('/', async function(req, res, next) {
  const users = await getAllUsers();
  res.send(users);
});

// insert user
router.post(`/`, async function(req, res, next) {
  const { name, photoUrl } = req.body;
  await insertUser(name, photoUrl);
  res.send('');
}); 

// insert user
router.post(`/:userId(\\d+)`, async function(req, res, next) {
  const { userId } = req.params;
  const { name } = req.body;
  const id = parseInt(userId);
  await updateUser(id, name);
  res.send('');
}); 

// get user by id
router.get(`/:userId(\\d+)`, async function(req, res, next) {
  const { userId } = req.params;
  const id = parseInt(userId);
  const user = await getUserById(id);
  res.send(user);
});

// get user by name
router.get(`/:userName`, async function(req, res, next) {
  const { userName } = req.params;
  const user = await getUserByName(userName);
  res.send(user);
})

// delete user
router.delete(`/:userId(\\d+)`, async function(req, res, next) {
  const { userId } = req.params;
  userId = parseInt(userId);
  await deleteUser(userId);
  res.send('');
})

module.exports = router;
