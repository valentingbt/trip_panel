const User = require('../models/user');
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Users
exports.user_list = function (req, res) {
    User.find()
        .sort([['date', 'ascending']])
        .exec(function (err, list_users) {
            if (err) { return next(err); }
            res.render('user_list', { title: 'Liste des utilisateurs', user_list: list_users })
        })
};

// Display detail page for a specific User
exports.user_detail = function(req, res) {

    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) { return next(err)}
            if (user == null) {
                var err = new Error('User not found');
                err.status = 404;
                return next(err);
            }
            res.render('user_detail', { title: 'Utilisateur:', user: user });
        })

}

// Display User Create on GET
exports.user_create_get = function (req, res) {
    res.render('user_form', { title: 'Creer un utilisateur' });
};

// Handle User create on POST.
exports.user_create_post = [

    // Validate fields
    body('name', 'Invalid name'),
    body('password', 'Invalid password'),
    body('role', 'Invalid role'),

    // Process request after validation and sanitization.
    (req, res, next) => {

            // Data from form is valid.

            // Create an User object with escaped and trimmed data.
            var user = new User(
                {
                    name: req.body.name,
                    password: req.body.password,
                    role: req.body.role,
                    position,
                    dateCreated
                });
            user.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(user.url);
            });

    }
];