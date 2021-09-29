const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");

// @todo import from env
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "this is a secret";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log("passport jwt strategy");
      try {
        const userResult = await User.findById(jwt_payload.id);
        if (userResult) {
          return done(null, person);
        }
        return done(null, false);
      } catch (error) {
        console.error(error);
      }

      // .then(
      //     person=>{
      //         if(person){
      //             return done(null,person);
      //         }
      //         return done(null,false);
      //     }
      // )
      // .catch(err=>console.log(err));
    })
  );
};
