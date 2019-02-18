/**
 * Created by Макс on 18.03.2017.
 */
var mongoose = require("../lib/mongoose"),
    Schema = mongoose.Schema;
var schema = new Schema({
    email: String,
    password: String
});

exports.User = mongoose.model("User", schema);
