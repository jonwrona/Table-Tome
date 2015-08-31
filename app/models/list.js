var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// a spell list links a user to a list of spells that they
//  created for a character for example

var SpellListSchema = new Schema({
	userid: { type: String, required: true },
	name: { type: String, required: true },
	spells: [ { type: String } ]
});

module.exports = mongoose.model('List', SpellListSchema);