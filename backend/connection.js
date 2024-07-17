const mongoose = require('mongoose');

let userDbConnection;
let eventDbConnection;

mongoose.connect('mongodb+srv://navneetharun0402:navneetharun2004@cluster0.jztkyk0.mongodb.net/userdb?retryWrites=true&w=majority&appName=cluster0')
  .then((connection) => {
    userDbConnection = connection;
    console.log('userdb is connected!');
  })
  .catch((err) => {
    console.log('userdb is not connected!');
  });

mongoose.connect('mongodb+srv://navneetharun0402:navneetharun2004@cluster0.jztkyk0.mongodb.net/eventdb?retryWrites=true&w=majority&appName=cluster0')
  .then((connection) => {
    eventDbConnection = connection;
    console.log('eventdb is connected!');
  })
  .catch((err) => {
    console.log('eventdb is not connected!');
  });

  console.log("Hi");