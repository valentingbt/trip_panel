const Event = require('../models/event');

// HOME PAGE
exports.index = function(req, res) {

    Event.find()
    .sort([['date', 'ascending']])
    .exec(function (err, list_events) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('index', { title_planning: 'Planning', event_list: list_events });
    });

};