var { mongoose } = require('../db/database');
var Schema = mongoose.Schema;

var EventShema = new Schema({
    date: {
        type: Date,
        [true, 'Veuillez ajouter une date']
    },
    name: {
        type: String,
        required: [true, 'Veuillez ajouter un nom']
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

var event = mongoose.model('Event', EventShema );
module.exports = { event };