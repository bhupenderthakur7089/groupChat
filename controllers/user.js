const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.signUp = (req, res) => {
    console.log('req body is', req.body);
    const user = req.body;
    const uName = user.uName;
    const uEmail = user.uEmail;
    const uMobile = user.uMobile;
    const uPass = user.uPassword;
    const saltRound = 10;
    bcrypt.hash(uPass, saltRound, (err, hash) => {
        console.log('hash is', hash);
        User
            .findAll({ where: { email: uEmail } })
            .then(user => {
                if (user.length > 0) {
                    res.json({ userExists: true });
                } else {
                    User
                        .create({
                            name: uName,
                            email: uEmail,
                            password: hash,
                            mobile: uMobile
                        })
                        .then(result => {
                            console.log(result);
                            res.json({ userExists: false });
                        })
                }
            })
            .catch(err => console.log(err));
    });

}

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, userName: name }, process.env.TOKEN_SECRET)
}

exports.login = (req, res, next) => {
    const credentials = req.body;
    const uEmail = credentials.email;
    const uPass = credentials.password;

    User
        .findAll({ where: { email: uEmail } })
        .then(user => {
            if (user[0]) {
                bcrypt.compare(uPass, user[0].password, (err, result) => {
                    if (err) {
                        throw new Error('Something went wrong')
                    }
                    if (result === true) {
                        return res.status(200).json({
                            loginStatus: true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name)
                        })
                    }
                    else if (result === false) {
                        return res.json({
                            loginStatus: false, message: "Password is incorrect"
                        })
                    }
                })
            } else {
                res.json({ loginStatus: 'User Not Found' });
            }
        })
        .catch(err => { console.log(err) });
}

exports.data = (req, res) => {
    res.json({ data: 'Thnku' });
}

