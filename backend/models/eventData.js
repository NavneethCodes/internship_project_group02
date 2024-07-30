const { eventDbConnection } = require('../connection');
const db = require('mongoose');

const eventSchema = new db.Schema({
    eventName       : String,
    eventDate       : Date,
    eventStartTime  : Date,
    eventEndTime    : Date,
    eventLocation   : String,
    eventDescription: String,
    eventOrganizer  : String,
    eventCategory   : String,
    imgsrc          : String
})

const eventData = eventDbConnection.model('events', eventSchema);
module.exports = eventData;