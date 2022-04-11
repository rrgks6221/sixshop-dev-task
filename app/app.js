'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const root = require('../app/src/apis/root');
const store = require('../app/src/apis/store');

app.use('/api', root);
app.use('/api/store', store);

module.exports = app;
