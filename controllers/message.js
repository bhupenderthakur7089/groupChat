const User = require('../models/user');
const Message = require('../models/message');
const dotenv = require('dotenv').config();
const con = require('../util/database');

exports.addMessage = async (req, res) => {
    console.log('req body is:', req.body)
    const message = req.body;
    const msgContent = message.content;
    const t = await con.transaction();
    console.log('Requesting user is:', req.user)
    req.user
        .createMessage({ content: msgContent }, { transaction: t })
        .then(async (result) => {
            console.log('result after message insertion into DB is:', result);
            await t.commit();
            res.json({ success: true });
        })
        .catch(async (err) => {
            console.log(err);
            await t.rollback();
            console.log(err)
        });
}

exports.getMessage = (req, res) => {
    Message
        .findAll()
        .then((messages) => {
            console.log('Messages are as follows:', messages);
            res.json({
                messages: messages,
            });
        })
        .catch(err => console.log(err));
}

exports.data = (req, res) => {
    res.json({ data: 'Hello World...This is a sample api which is being called on loading this window' });
}

