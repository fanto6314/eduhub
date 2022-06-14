const {DataTypes} = require('sequelize');
const connection = require("../db/connection");

const File = connection.define('File', {
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    url: {
        type: DataTypes.STRING, allowNull: false
    },
}, {});
module.exports = File;
