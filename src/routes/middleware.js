const authRequired = async (req, res, next) => {
    try {
        if (req.session.user) return next();
        else throw new Error("NOT_FOUND");
    } catch (err) {
        return next (err);
    }
};

module.exports = { authRequired };