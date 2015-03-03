var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


// accessContent defines whether a user has access to official dnd content other
//   than the basic rules.
// accessCustom defines whether a user has access to creating custom content on
//   TableTome. A paid user can do this.
// admin users have access to everything by default including administration tools

// user schema 
var UserSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true, select: false },
	accessContent: { type: Boolean, default: false, required: true },
	accessCustom: {type: Boolean, default: false, required: true},
	admin: {type: Boolean, default: false, required: true},
	// custom spell slots will be added here?
});

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.hash(user.password, null, null, function(err, hash) { 
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);