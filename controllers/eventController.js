const Event = require('../models/event');
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// HOME PAGE
exports.index = function (req, res) {
    async.parallel({
        event_count: function (callback) {
            Event.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        }
    }, function (err, results) {
        res.render('index_admin', { title: 'Administration USA 2019', error: err, data: results });
    });
};

// Display list of all Events.
exports.event_list = function (req, res) {
    Event.find()
        .sort([['date', 'ascending']])
        .exec(function (err, list_events) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('event_list', { title: 'Liste des événements', event_list: list_events });
        });
};

// Display detail page for a specific Event.
exports.event_detail = function (req, res) {

    Event.findById(req.params.id)
        .populate('book')
        .exec(function (err, event) {
            if (err) { return next(err); }
            if (event == null) { // No results.
                var err = new Error('Event not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('event_detail', { title: 'Evênement:', event: event });
        })

};

// Display Event create form on GET.
exports.event_create_get = function (req, res) {

    res.render('event_form', { title: 'Creer un evenement' });

};

// Handle Event create on POST.
exports.event_create_post = [

    // Validate fields
    body('date', 'Invalid date'),
    body('title', 'Invalid title'),
    body('isDone', 'Invalid state'),
    body('description'),
    body('longitude'),
    body('latitude'),

    // Sanitize fields.
    sanitizeBody('date').toDate(),
    sanitizeBody('title').toString(),
    sanitizeBody('isDone').toBoolean(),
    sanitizeBody('description').toString(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('event_form', { title: 'Creer un evenement', event: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Event object with escaped and trimmed data.
            var event = new Event(
                {
                    date: req.body.date,
                    title: req.body.title,
                    isDone: req.body.isDone,
                    description: req.body.description,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                });
            event.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(event.url);
            });
        }
    }
];

// Display Event delete form on GET.
exports.event_delete_get = function (req, res) {

    Event.findById(req.params.id)
    .populate('book')
    .exec(function (err, event) {
        if (err) { return next(err); }
        if (event == null) { // No results.
            var err = new Error('Event not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('event_delete', { title: 'Evênement:', event: event });
        
})
};

// Handle Event delete on POST.
exports.event_delete_post = function (req, res) {

    async.parallel({
        event: function(callback) {
          Event.findById(req.body.eventid).exec(callback)
        }
    }, function(err) {
        if (err) { return next(err); }

        else {
            Event.findByIdAndRemove(req.body.eventid, function deleteEvent(err) {
                if (err) { return next(err); }
                // Success - go to event list
                res.redirect('/catalog/events')
            })
        }
    });

};

// Display Event update form on GET.
exports.event_update_get = function (req, res) {
        // Get event, authors and genres for form.
        async.parallel({
            event: function(callback) {
                Event.findById(req.params.id).exec(callback);
            },
            }, function(err) {
                if (err) { return next(err); }
                // Success.
                res.render('event_form', { title: 'Modifier l\'évenement' });
            });
};

// Handle event update on POST.
exports.event_update_post = [
   
    // Validate fields.
    body('date', 'Invalid date'),
    body('title', 'Invalid title'),
    body('isDone', 'Invalid state'),
    body('description'),
    body('longitude'),
    body('latitude'),

    // Sanitize fields.
    sanitizeBody('date').toDate(),
    sanitizeBody('title').toString(),
    sanitizeBody('isDone').toBoolean(),
    sanitizeBody('description').toString(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var event = new Event(
          { 
            date: req.body.date,
            title: req.body.title,
            isDone: req.body.isDone,
            description: req.body.description,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

                if (err) { return next(err); }

                res.render('event_form', { title: 'Update Event' });

        }
        else {
            // Data from form is valid. Update the record.book
            Event.findByIdAndUpdate(req.params.id, event, {}, function (err,theevent) {
                if (err) { return next(err); }
                   // Successful - redirect to event detail page.
                   res.redirect(theevent.url);
                });
        }
    }
];