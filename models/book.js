const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('library', 'postgres', 'imani2001', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const book = sequelize.define('book', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    bookname : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

async function syncBook() {
    try {
        sequelize.sync();
        console.log('Book table successfully created!');
    } catch (error) {
        console.error('Could not create table in database');
    }
}

syncBook();

module.exports = {book, syncBook};