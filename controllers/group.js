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
        .create({ name: groupName, createdBy: req.user.id }, { transaction: t })
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

exports.getGroups = async (req, res) => {
    let userId = req.user.id;
    console.log('User Id is:', req.user.id);
    const t = await con.transaction();
    Group
        .findAll({
            where: {
                createdBy: userId
            }
        })
        .then((userGroups) => {
            console.log('groups are', userGroups);
            res.json({
                groups: userGroups,
            });
        })
        .catch(err => console.log(err));
}
