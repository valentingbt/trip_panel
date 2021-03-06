var express = require('express');
var router = express.Router();

var event_controller = require('../controllers/eventController');
var position_controller = require('../controllers/positionController');
var user_controller = require('../controllers/userController');

/// EVENT ROUTES ///

// GET request for creating a Event. NOTE This must come before routes that display Book (uses id).
router.get('/', event_controller.index);

// GET request for creating a Event. NOTE This must come before routes that display Book (uses id).
router.get('/event/create', event_controller.event_create_get);

// POST request for creating Event.
router.post('/event/create', event_controller.event_create_post);

// GET request to delete Event.
router.get('/event/:id/delete', event_controller.event_delete_get);

// POST request to delete Event.
router.post('/event/:id/delete', event_controller.event_delete_post);

// GET request to update Event.
router.get('/event/:id/update', event_controller.event_update_get);

// POST request to update Event.
router.post('/event/:id/update', event_controller.event_update_post);

// GET request for one Event.
router.get('/event/:id', event_controller.event_detail);

// GET request for list of all Event items.
router.get('/events', event_controller.event_list);

// POSITION ROUTES

// GET request for the update of positions
router.get('/position/update', position_controller.position_update);

// GET request for the list of positions
router.get('/position/list', position_controller.position_list);

// USER ROUTES

// GET request for the list of users
router.get('/user/list', user_controller.user_list);

// GET request for creating a User. NOTE This must come before routes that display Book (uses id).
router.get('/user/create', user_controller.user_create_get);

// POST request for creating User.
router.post('/user/create', user_controller.user_create_post);

// GET request for one User.
router.get('/user/:id', user_controller.user_detail);

module.exports = router;