var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// spell types is equivalent to a users permissions
//   basic : from the basic rules
//   phb : from the players handbook
//   custom : custom spells

var permissionLvls = ['basic', 'core']
var books = ['Basic Rules', 'Player\'s Handbook'];
var schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'necromancy', 'transmutation'];
var classes = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];


var SpellSchema = new Schema({
	// metadata
	permissionLvl: {type: String, required: true, enum: permissionLvls },
	custom: { type: Boolean, required: true },
	author: String,
	books: [ { book: { type: String, required: true, enum: books }, page: {type: Number, min: 0} } ],
	// spell info
	name: { type: String, required: true, index: { unique: true } },
	level: { type: Number, required: true, min:0, max:9 },
	school: { type: String, required: true, enum: schools },
	ritual: { type: Boolean, required: true},
	classes: { type: [{ type: String, required: true, enum: classes }], required: true },
	castingTime: { type: String, required: true },
	duration: { type: String, required: true },
	range: { type: String, required: true },
	visual: { type: Boolean, required: true},
	somatic: { type: Boolean, required: true },
	material: { has: {type: Boolean, required: true}, items: String },
	description: [ { title: String, text: { type: String, required: true } } ]
});

module.exports = mongoose.model('Spell', SpellSchema);