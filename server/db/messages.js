const Joi = require('joi');
const db = require('./connection');

const messages = db.get('messages');

/**
 * Fields for the database
 * username - default to anonymous
 * subject
 * message
 * imageURL
 * created_at
 */
const schema = Joi.object().keys({

  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [
      /https?/
    ]
  })

});

function getAll() {
  return messages.find();
}

function insertMsg(message) {

  if (!message.username) message.username = 'Anonymous';

  const result = Joi.validate(message, schema);

  if (result.error == null) {
    message.created_at = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }

}

module.exports = {
  getAll,
  insertMsg
}