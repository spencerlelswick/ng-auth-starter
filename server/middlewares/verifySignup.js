const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log('checking for use with email: ', req.body.userData.email);

  User.findOne({
    email: req.body.userData.email
  }).then(user => {

    if (user?.email) {
      res.status(400).send({ message: 'Failed! Email is already in use!' })
      return
    }

    next()
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err });
    return;
  })
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;