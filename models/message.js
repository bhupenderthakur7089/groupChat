const sequelize = require('sequelize');
const con = require('../util/database');

const User = con.define('message', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: sequelize.STRING,
});

module.exports = User;