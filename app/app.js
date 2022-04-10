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

app.use('/', root);

module.exports = app;
