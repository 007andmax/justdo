/**
 * Created by Макс on 18.03.2017.
 */
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
    code:{
        type: Number
    },
});

exports.ForgotPassword = mongoose.model('ForgotPassword', schema);
