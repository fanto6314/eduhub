const {DataTypes} = require('sequelize');
const connection = require("../db/connection");

const User = connection.define('User', {
    name: {
        type: DataTypes.STRING, allowNull: false
    }, email: {
        type: DataTypes.STRING, allowNull: false
    }, password: {
        type: DataTypes.STRING, defaultValue: ""
    }, picture: {
        type: DataTypes.STRING,
    }, isOAuth: {
        type: DataTypes.BOOLEAN, allowNull: false
    }
}, {});
module.exports = User;
