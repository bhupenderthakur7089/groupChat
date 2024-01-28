const User = require('../models/user');
const Group = require('../models/group');
const UserGroup = require('../models/userGroup');
const con = require('../util/database');
const { Sequelize } = require('sequelize');

exports.createGroup = async (req, res) => {
    console.log('Group Name is:', req.body.name);
    console.log('User is:', req.user);
    const groupName = req.body.name;
    const t = await con.transaction();
    Group
        .create({ name: groupName, createdBy: req.user.name }, { transaction: t })
        .then(async (result) => {
            console.log('result after group creation is:', result);
            await t.commit();
            res.json({ success: true });
        })
        .catch(async (err) => {
            console.log(err);
            await t.rollback();
            console.log(err)
        });
}
