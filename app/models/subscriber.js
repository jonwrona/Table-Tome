var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);