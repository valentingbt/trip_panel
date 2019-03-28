var mongoose = require('mongoose');
moment = require('moment');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        position: {
            type: Array,
            "default": []
        },
        dateCreated: {
            type: Date,
            default: new Date().getTime()
        }
    }
);

UserSchema
    .virtual('url')
    .get(function () {
        return '/admin/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema);