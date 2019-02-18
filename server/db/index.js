let User = require("../models/user").User;
let ForgotPassword = require("../models/forgot-password").ForgotPassword;

addForgotPassword = (userData,res) => {
  let fpObject = new ForgotPassword({code:1111});
  fpObject.save((err, fpData, affected) => {
      if (err) {

          res.status(500).send({ result: false });
      }
      if (fpData) {
        userData.ForgotPasswords.push(fpData._id);
        userData.save();
        res.send({ result: true });
      }
  });
}


module.exports.addForgotPassword = addForgotPassword;

