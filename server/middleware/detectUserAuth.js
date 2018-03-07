const detectUserAuth = function (req, res, next) {
    const authUser = req.session.passport;
    res.locals.authUser = Boolean(authUser);
    next();
};

module.exports = {detectUserAuth}
