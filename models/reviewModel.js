const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/DB-Connection');

const Review = sequelize.define('review',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    pros:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cons:{
        type: DataTypes.STRING,
        allowNull: false
    },
    stars:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Review;