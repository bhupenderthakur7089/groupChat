const sequelize = require('sequelize');
const con = require('../util/database');

const UserGroup = con.define('UserGroup');

module.exports = UserGroup;