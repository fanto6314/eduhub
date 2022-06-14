const {DataTypes} = require('sequelize');
const connection = require("../db/connection");

const Group = connection.define('Group', {
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    code: {
        type: DataTypes.STRING, allowNull: false
    },
}, {});
module.exports = Group;
