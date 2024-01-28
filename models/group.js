const sequelize = require('sequelize');
const con = require('../util/database');

const Group = con.define('group', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: sequelize.STRING,
    createdBy: sequelize.STRING
});

module.exports = Group;