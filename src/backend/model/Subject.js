const {DataTypes} = require('sequelize');
const connection = require("../db/connection");

const Subject = connection.define('Subject', {
    name: {
        type: DataTypes.STRING, allowNull: false
    },
}, {});
module.exports = Subject;
