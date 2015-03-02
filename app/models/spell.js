var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// userlvl is equivalent to a users permissions
// the following are the user permission levels
//   basic  :  access to only basic rules
//	 full   :  access to all content from dnd players handbook
//   paid   :  access to custom spellbooks and additional features
//   admin  :  access to full app functionality including administration

var SpellSchema = new Schema({
	userlvl: { type: String, required: true },
	name: { type: String, required: true, index: { unique: true } },
	level: { type: Number, required: true },
	school: { type: String, required: true },
	ritual: { type: Boolean, required: true},
	classes: { type: [{ type: String, required: true }], required: true },
	castingTime: { type: { amount: { type: Number, required: true }, 
	               unit: { type: String, required: true } }, required: true },
	duration: { type: { amount: { type: Number, required:true }, 
	            unit: { type: String, required: true } }, required: true },
	range: { type: String, required: true },
	visual: { type: Boolean, required: true},
	somatic: { type: Boolean, required: true },
	material: { type: { has: { type: Boolean, required: true }, 
	            items: String }, required: true },
	description: [{ title: String, 
		            paragraph:{type: String, required: true} }],
	page: Number
});

// SpellSchema.pre('save', function(next) {
// 	var spell = this;
// 	// do spell verification here
// 	return next();
// });

module.exports = mongoose.model('Spell', SpellSchema);