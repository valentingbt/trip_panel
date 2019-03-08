const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    date: {
        type: Date(),
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
    position: {
        long: {
            type: Number
        },
        lat: {
            type: Number
        }
    }
});

module.exports = mongoose.model('Event', EventSchema);