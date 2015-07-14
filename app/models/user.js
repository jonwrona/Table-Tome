var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	verified: {type: Boolean, required: true, default: false},
	admin: {type: Boolean, required: true, default: false},
	password: {type: String, required: true, select: false}
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
	console.log(password + " " + user.password);
	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);