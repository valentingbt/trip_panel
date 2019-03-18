const { mongoose } = require('../db/database');

const event = mongoose.model('Event', {
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    }
});

module.exports = { event };