const { eventDbConnection } = require('../connection');
const db = require('mongoose');

const eventSchema = new db.Schema({
    eventName: String,
    eventDate: Date,
    startTime: Date,
    endTime: Date,
    location: String,
    description: String,
    organizer: String
})

const eventData = eventDbConnection.model('event', eventSchema);
module.exports = eventData;