'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class book extends Model {

        static associate(models) {
            this.hasMany(models.detail_of_borrow, {
                foreignKey: 'bookID',
                as: 'detail_of_borrowed'
            })
        }
    }
    book.init({
        isbn: DataTypes.STRING,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        publisher: DataTypes.STRING,
        category: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        cover: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'book',
    });
    return book;
};