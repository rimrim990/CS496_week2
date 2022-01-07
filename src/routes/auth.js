const express = require('express');
const UserDAO = require('../DAO/user');
const RunningDAO = require('../DAO/running');

const router = express.Router();
const { verifyPassword, generatePassword } = require("../lib/authentication");
const { insertUser, getUserByUsername } = UserDAO;
const { insertRunning } = RunningDAO;

// signin
router.post('/signin', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new Error("BAD REQUEST");

        const user = await getUserByUsername(username);
        if (!user) throw new Error("UNAUTHORIZED");

        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) throw new Error("UNAUTHORIZED");

        req.session.user = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
        };
        return res.json(`singin success! hello ${user.displayName}`);
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

// signout
router.get('signout', async (req, res, next) => {
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