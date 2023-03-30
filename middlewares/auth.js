const jwt = require('jsonwebtoken');
const User = require('../models/user.modal');

require('dotenv').config();

const isAuth = async (req, res, next) => {


    const token = req.header('Authorization').replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id)


    return next();
}


module.exports = isAuth;