const db = require('mongoose');

const userSchema = new db.Schema({
  userContact: String,
  userEmail: String,
  userName: String,
  userPassword: String,
  userStatus: String,
  userImg: String,
  registered_events: [{ type: db.Schema.Types.ObjectId, ref: 'events' }]
});

const userData = db.model('users', userSchema);
module.exports = userData;