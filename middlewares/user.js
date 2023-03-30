const User = require('../models/user.modal');

const jwt = require('jsonwebtoken');

exports.isLoggedIn = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)
    next()
}

module.exports = isLoggedIn;