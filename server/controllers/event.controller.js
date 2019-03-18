const Joi = require('joi');
const Event = require('../models/event.model');

const eventSchema = Joi.object({
  date: Joi.date(),
  name: Joi.string().required(),
  isDone: Joi.boolean().required(),
  description: Joi.string(),
  longitude: Joi.number(),
  latitude: Joi.number()
})

module.exports = {
  insert
}

async function insert(event) {
  event = await Joi.validate(event, eventSchema, { abordEarly: false });
  return await new Event(event).save();
}