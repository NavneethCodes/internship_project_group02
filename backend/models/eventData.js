const { default: mongoose } = require('mongoose');
const { eventDbConnection } = require('../connection');

const eventSchema = new eventDbConnection.Schema({
    eventName: String,
    eventDate: Date,
    startTime: Date,
    endTime: Date,
    location: String,
    description: String,
    organizer: String
})

const eventData = mongoose.model('event', eventSchema);
module.exports = eventData;