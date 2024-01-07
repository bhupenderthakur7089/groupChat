const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signUp = (req, res) => {
    console.log('req body is', req.body);
    const user = req.body;
    const uName = user.uName;
    const uEmail = user.uEmail;
    const uMobile = user.uMobile;
    const uPass = user.uPassword;
    const saltRound = 10;
    bcrypt.hash(uPass, saltRound, (err, hash) => {
        console.log('hash is',hash);
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

exports.data = (req, res) => {
    res.json({ data: 'Thnku' });
}

