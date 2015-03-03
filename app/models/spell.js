var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// userlvl is equivalent to a users permissions
// the following are the user permission levels
//   basic  :  access to only basic rules
//	 full   :  access to all content from dnd players handbook
//   paid   :  access to custom spellbooks and additional features
//   admin  :  access to full app functionality including administration

var SpellSchema = new Schema({
	basic: { type: Boolean, required: true },
	name: { type: String, required: true, index: { unique: true } },
	level: { type: Number, required: true },
	school: { type: String, required: true },
	ritual: { type: Boolean, required: true},
	classes: { type: [{ type: String, required: true }], required: true },
	castingTime: { type: String, required: true },
	duration: { type: String, required: true },
	range: { type: String, required: true },
	visual: { type: Boolean, required: true},
	somatic: { type: Boolean, required: true },
	material: { has: {type: Boolean, required: true}, items: String },
	description: [ { title: String, text: { type: String, required: true } } ],
	page: Number
});

SpellSchema.pre('save', function(next) {
	var spell = this;
	// do spell verification here
	return next();
});

module.exports = mongoose.model('Spell', SpellSchema);