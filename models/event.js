var mongoose = require('mongoose');
moment = require('moment');

var Schema = mongoose.Schema;

var EventSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        isDone: {
            type: Boolean,
            required: true
        },
        longitude: {
            type: Number
        },
        latitude: {
            type: Number
        },
    }
);

// Virtual for Event's URL
EventSchema
    .virtual('url')
    .get(function () {
        return '/admin/event/' + this._id;
    });

EventSchema
    .virtual('hour')
    .get(function () {
        moment.locale();
        return moment(this.date).format('HH:mm');
    });

EventSchema
    .virtual('day_number')
    .get(function () {
        moment.locale();
        return moment(this.date).format('DD');
    });

EventSchema
    .virtual('day')
    .get(function () {
        moment.locale();
        return moment(this.date).format('dddd DD MMMM YYYY');
    });

// Export model
module.exports = mongoose.model('Event', EventSchema);