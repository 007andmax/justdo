let User = require("../models/user").User;
let ForgotPassword = require("../models/forgot-password").ForgotPassword;
let promise = null;

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

checkForgotPassword = (email,code,password,res) => {
  promise = User.findOne({email:email}).populate("ForgotPasswords").exec();
    promise.then((data,error) => {
    if (data) {
      let index = data.ForgotPasswords.findIndex(item => item.code === Number(code));
      if (index > -1)
      {
        data.password = password;
        data.save();
        res.send({ result: true });
      } else {
        res.status(403).send({ result: false });
      }
    } else {
      res.status(403).send({ result: false });
    }

  });
}
module.exports.checkForgotPassword = checkForgotPassword;
module.exports.addForgotPassword = addForgotPassword;

