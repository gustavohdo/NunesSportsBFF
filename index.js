const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const produtoRoute = require('./routes/produto');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/produto', produtoRoute);

module.exports = app;