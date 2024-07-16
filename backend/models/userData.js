const { userDbConnection } = require('../connection');

const userSchema = new userDbConnection.Schema({
  userContact: String,
  userEmail: String,
  userName: String,
  userPassword: String,
  userStatus: String,
  liked_events: [{ type: userDbConnection.Schema.Types.ObjectId, ref: 'events' }]
});

const userData = userDbConnection.model('user', userSchema);
module.exports = userData;