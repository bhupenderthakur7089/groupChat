const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv').config();

exports.authenticate = (req, res, next) => {
    const userToken = req.header('authorization');
    const user = jwt.verify(userToken, process.env.TOKEN_SECRET);
    const id = user.userId;
    User
        .findByPk(id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({ success: false });
        });

}