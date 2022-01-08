const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

const generateToken = async (_id, username, password) => {
    const payload = {
        _id,
        username,
        password
    }
    const options = {
        expiresIn: '7d',
    };

    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload, 
                SECRET, 
                options,
                (error, token) => {
                    if (error) reject(error);
                    resolve(token);
                }
            )
        }
    );
}

const verifyToken = async (token) => {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, SECRET, (error, decoded) => {
                if (error) reject(error);
                resolve(decoded);
            })
        }
    );
}

module.exports = {
    generateToken,
    verifyToken,
};