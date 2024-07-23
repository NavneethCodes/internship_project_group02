const { eventDbConnection } = require('../connection');
const db = require('mongoose');

const eventRecordsSchema = new db.Schema({
    event_id : {
        type    :  db.Schema.Types.ObjectId,
        ref     :  'event',
        db      :  'eventdb'    
    },
    likes    :  [{
        type    : db.Schema.Types.ObjectId,
        ref     : 'users',
        db      : 'userdb'   
    }],
    comments : [{
        user_id : {
            type    : db.Schema.Types.ObjectId,
            ref     : 'users',
            db      : 'userdb'
        },
        comment : String
    }]
});

const eventRecordsData = eventDbConnection.model('event-record', eventRecordsSchema);
module.exports = eventRecordsData;