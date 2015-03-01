var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpellSchema = new Schema({
	userlvl = { type: String, required: true },
	name = { type: String, required: true, index: { unique: true } },
	level = { type: Number, required: true },
	schools = [{ type: String, required: true }],
	ritual = { type: boolean, required: true},
	classes = [{ type: String, required: true }],
	castingTime = { amount: Number, unit: String, required: true },
	duration = { amount: Number, unit: String, required: true },
	range = { type: String, required: true },
	visual = { has: boolean, required: true },
	somatic = { has: boolean, required: true },
	material = { has: boolean, items: String, required: true },
	description = [{ title: String, paragraph: String, required: true }],
	page = { type: Number, required: true }
});

module.exports = mongoose.model('Spell', SpellSchema);