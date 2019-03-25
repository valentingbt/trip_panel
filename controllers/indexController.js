const Event = require('../models/event');
const moment = require('moment-timezone');

// HOME PAGE
exports.index = function(req, res) {

    Event.find()
    .sort([['date', 'ascending']])
    .exec(function (err, list_events) {
        if (err) { return next(err); }
        //Successful, so render
        dateFrance = moment();
        todayParis = dateFrance.tz('Europe/Paris').format('HH:mm');
        todayDenver = moment().tz('America/Denver').format('HH:mm');
        res.render('index', { title: 'Notre voyage aux USA : Tous les infos', title_planning: 'Planning', event_list: list_events, dateFrance: dateFrance, todayParis: todayParis, todayDenver: todayDenver });
    });

};