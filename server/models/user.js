/**
 * Created by Макс on 18.03.2017.
 */
var mongoose = require("../lib/mongoose"),
    Schema = mongoose.Schema;
var schema = new Schema({
    email: String,
    password: String,
    ForgotPasswords: [{type: mongoose.Schema.Types.ObjectId, ref: 'ForgotPassword'}],
});

exports.User = mongoose.model("User", schema);
