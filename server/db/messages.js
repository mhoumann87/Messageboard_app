const db = require('./connection');

const messages = db.get('messages');

function getAll() {
  return messages.find();
}

module.exports = {
  getAll
}