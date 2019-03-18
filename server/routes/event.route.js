const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const eventCtrl = require('../controllers/event.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/addevent', asyncHandler(addEvent), event);

async function addEvent(req, res, next) {
  let event = await eventCtrl.insert(req.body);
  event = event.toObject();
  req.event = event;
  next()
}

function event(req, res) {
  let event = req.event;
  res.json({ event });
}