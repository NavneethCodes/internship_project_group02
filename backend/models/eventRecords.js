const db = require('mongoose');

const eventRecordsSchema = new db.Schema({
    event_id : {
        type    :  db.Schema.Types.ObjectId,
        ref     :  'event',
        db      :  'gleve_db'    
    },
    likes    :  [{
        type    : db.Schema.Types.ObjectId,
        ref     : 'users',
        db      : 'gleve_db'   
    }],
    comments : [{
        user_id : {
            type    : db.Schema.Types.ObjectId,
            ref     : 'users',
            db      : 'gleve_db'
        },
        comment : String
    }]
});

const eventRecordsData = db.model('event_records', eventRecordsSchema);
module.exports = eventRecordsData;