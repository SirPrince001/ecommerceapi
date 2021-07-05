const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgon = require('morgan')
const routes = require('./routes/index')

require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgon("tiny"))
app.use(routes)
require('./database/db').connect()
module.exports = app;
