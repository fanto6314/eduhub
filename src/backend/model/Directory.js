const {DataTypes} = require('sequelize');
const connection = require("../db/connection");

const Directory = connection.define('Directory', {
    name: {
        type: DataTypes.STRING, allowNull: false
    },
}, {});
module.exports = Directory;
