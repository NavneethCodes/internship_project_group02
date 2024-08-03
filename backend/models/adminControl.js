const db = require('mongoose');

const adminControlSchema = new db.Schema({
    active_users : [{type:db.Schema.Types.ObjectId, ref:'users'}]
});

const adminControl = db.model('admin_control', adminControlSchema);

module.exports = adminControl;