const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const dotenv = require('dotenv').config()
const AUTH_SECRET = dotenv.parsed.AUTH_SECRET

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.userData.name,
    email: req.body.userData.email,
    age: req.body.userData.age,
    password: bcrypt.hashSync(req.body.userData.password, 8),
    phoneNumber: req.body.userData.phoneNumber
  });

  console.log('saving user ', user);

  user.save().then(response => {
    console.log(response);
    console.log('User successfully registered.');
    res.status(200).send({ message: "User was registered successfully!" });
    return
  }).catch(err => {
    console.log('error ', err);
    res.status(500).send({ message: err });
    return;
  })
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.userData.email,
  })
    .then(user => {

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.userData.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
        AUTH_SECRET,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
      req.session.token = token;
      res.status(200).send(user);
    })
    .catch(err => {
      console.log('error ', err);
      res.status(500).send({ message: err });
      return;
    })
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};