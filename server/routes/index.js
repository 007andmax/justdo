var express = require("express");
var router = express.Router();
let User = require("../models/user").User;
let ForgotPassword = require("../models/forgot-password").ForgotPassword;
let DB = require("../db/index");
let promise = null;


router.post("/sign-in", function (req, res, next) {

 if (req.body.email && req.body.password)
 {
  promise = User.findOne({email:req.body.email}).exec();
  promise.then((data,error) => {
    if (data) {
      res.send({ result: true });
    } else {
      res.status(403).send({ result: false });
    }

  });
 } else {
  res.status(403).send({ result: false });
 }


});

router.post("/sign-up", function (req, res, next) {

  if (req.body.email && req.body.password)
  {
    let userObject = new User({email:req.body.email, password: req.body.password});
    userObject.save((err, userData, affected) => {
        if (err) {
            console.log('err',err);
            res.status(500).send({ result: false });
        }
        if (userData) {

          res.send({ result: true });
        }
    });
  } else {
   res.status(403).send({ result: false });
  }


 });

 router.post("/forgot-password", function (req, res, next) {

  if (req.body.email)
  {
    promise = User.findOne({email:req.body.email}).exec();
    promise.then((data,error) => {
    if (data) {
      DB.addForgotPassword(data,res);

    } else {
      res.status(403).send({ result: false });
    }

  });
  } else {
   res.status(403).send({ result: false });
  }


 });


 router.post("/reset-password", function (req, res, next) {

  if (req.body.email && req.body.password)
  {
    promise = User.findOne({email:req.body.email}).exec();
    promise.then((data,error) => {
    if (data) {
      data.password = req.body.password;

      data.save();
      res.send({ result: true });
    } else {
      res.status(403).send({ result: false });
    }

  });
  } else {
   res.status(403).send({ result: false });
  }


 });
module.exports = router;
