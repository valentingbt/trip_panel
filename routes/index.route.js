const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const app = express();

const { getEvent } = require('./event.route');

app.use(bodyParser.json());


// EVENT

//get
app.get('/event', getEvent); //get all events

module.exports = { app };