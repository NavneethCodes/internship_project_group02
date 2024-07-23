const { userDbConnection } = require('../connection');
const db = require('mongoose');

const userSchema = new db.Schema({
  userContact: String,
  userEmail: String,
  userName: String,
  userPassword: String,
  userStatus: String,
  liked_events: [{ type: db.Schema.Types.ObjectId, ref: 'events' }]
});

const userData = userDbConnection.model('users', userSchema);
module.exports = userData;