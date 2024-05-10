const express = require('express');
const bodyParser =  require('body-parser');
const {book} = require('../models/book');

const route = express.Router();

route.post('/add', async (req, res) => {
    try {
        const {id, bookname, author} = req.body;
        const books = await book.create({id, bookname, author});
        res.status(200).json(books);
    } catch (error) {
        console.error('could not create record', error);
        res.status(500).json({message: 'could not create record'});
    }
});

route.get('/show', async (req, res) => {
    try {
        const booka = await book.findAll();
        res.status(200).json(booka);
    } catch (error) {
        console.error('Did not find any books');
        res.status(404).json({message: 'did not find ant books'});
    }
});

route.get('/show/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const booc = await book.findByPk(id);

        if (!booc) {
            res.status(404).json({error: 'could not find that book'})
        }
        res.status(200).json(booc);
    } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({error: 'something went wrong'});
    }
});

route.put('/update/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {bookname, author} = req.body;
        const booke = await book.findByPk(id);
        
        if(!booke) {
            res.status(404).json({error: 'could not find that book'});
        }
        const book1 = await book.update({bookname, author}, {  where: {id: id}});
        res.status(200).json(book1);
    } catch (error) {
        console.error('something went wrong', error);
    }
});

route.delete('/remove/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const booki = await book.findByPk(id);

        if (!booki) {
            res.status(404).json({error: 'could not find that book'});
        }
        await booki.destroy();
        res.status(200).json({message: 'record successfully deleted'});
    } catch (error) {
        console.error('something went wrong', error);
        res.status(500).json({error: 'something went wrong'});
    }
});

module.exports = route;