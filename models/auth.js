const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Auth = db.define('Users', {
    name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
})

module.exports = Auth