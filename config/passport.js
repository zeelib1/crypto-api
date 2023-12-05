const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User"); // adjust the path if needed

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "No user with that email" });
          }
          // Use comparePassword method from User model
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              console.log(err);
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    console.log("serializeUser: ", user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserializeUser: ", id);
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
