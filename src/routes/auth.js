const express = require('express');
const { generateToken, verifyToken } = require('../lib/token');
const UserDAO = require('../DAO/user');
const RunningDAO = require('../DAO/running');

const router = express.Router();
const { verifyPassword, generatePassword } = require("../lib/authentication");
const { insertUser, getUserByUsername, getUserById } = UserDAO;
const { insertRunning } = RunningDAO;

// signin
router.post('/signin', async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.query);
        const { username, password } = req.body;
        let access_token = null;

        if (!username || !password) throw new Error("BAD REQUEST");

        const user = await getUserByUsername(username);
        if (!user) throw new Error("UNAUTHORIZED");

        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) throw new Error("UNAUTHORIZED");

        access_token = await generateToken(user._id, user.username, user.password);

        return res.json({
            message: 'logged in successfully',
            access_token,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// signup
router.post('/signup', async (req, res, next) => {
    try {
        const { username, password, displayName, photoUrl } = req.body;
        if (
            !username ||
            username.length > 16 ||
            !password ||
            !displayName ||
            displayName > 32
        )
            throw new Error("BAD-REQUEST");

        const hashedPassword = await generatePassword(password);
        const userId = await insertUser(username, hashedPassword, displayName, photoUrl);
        await insertRunning(userId);
        return res.json(`signup success! welcome ${displayName}`);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// authenticate user
router.get('/authenticate', async (req, res, next) => {
    try {
        const access_token = req.get('access_token');
        if (!access_token) return res.send(false);

        const decoded = await verifyToken(access_token);
        if (!decoded) return res.send(false);

        const user = await getUserById(decoded._id);
        if (!user) return res.send(false);
        else return res.send(true);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// signout
router.get('/signout', async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) throw err;
            else return res.json('signout success');
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

module.exports = router;