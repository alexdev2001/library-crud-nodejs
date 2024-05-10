const express = require('express');
const bookRoute = require('../router/bookRoute');
const {syncBook} = require('../models/book');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

app.use('/book', bookRoute);

syncBook()

app.listen(3000, () => {
    console.log('now listening on port 3000');
});