const mongoose = require('mongoose');

const gleveDbConnection = mongoose.connect('mongodb+srv://gleve:gleve2024@cluster0.c6guzwj.mongodb.net/gleve_db?retryWrites=true&w=majority&appName=Cluster0').then((res) => {
  console.log('Gleve DB is online.');
}).catch((error) => {
  console.log('Gleve DB is offline.');
})

module.exports = { gleveDbConnection }
