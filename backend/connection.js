const mongoose = require('mongoose');

const userDbConnection = mongoose.createConnection('mongodb+srv://navneetharun0402:navneetharun2004@cluster0.jztkyk0.mongodb.net/userdb?retryWrites=true&w=majority&appName=cluster0');

userDbConnection.once('open', () => {
  console.log('userdb is connected!');
}).on('error', (err) => {
  console.error('userdb connection error:', err);
});

const eventDbConnection = mongoose.createConnection('mongodb+srv://navneetharun0402:navneetharun2004@cluster0.jztkyk0.mongodb.net/eventdb?retryWrites=true&w=majority&appName=cluster0');

eventDbConnection.once('open', () => {
  console.log('eventdb is connected!');
}).on('error', (err) => {
  console.error('eventdb connection error:', err);
});

module.exports = { userDbConnection, eventDbConnection };
