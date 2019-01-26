const monk = require('monk');

const connectionString = process.envMONGODB_URI || 'localhost/messageboard';
const db = monk(connectionString);

module.exports = db;