const { verifyToken } = require("../lib/token");

const authRequired = async (req, res, next) => {
    try {
        // if (req.session.user) return next();
        // else throw new Error("NOT_FOUND");
        const token = req.headers['x-access-token'] || req.query.access_token;
        let decoded;

        if (!token) {
            return res.status(403).json({
                message: 'not logged in',
            });
        }

        decoded = await verifyToken(access_token);
        req.access_token = decoded;

        next();

    } catch (err) {
        return next (err);
    }
};

module.exports = { authRequired };