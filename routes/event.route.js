const { mongoose } = require('../db/database');
const { event } = require('../models/event.model');

const ObjectID = mongoose.Types.ObjectId;

// GET

// get all

const getEvent = (req, res) => {
    event.find().then(listEvent => {
        res.json(listEvent);
    }, err => {
        res.status(500).send(err);
    }
    );
}

// Exports

module.exports = { getEvent };