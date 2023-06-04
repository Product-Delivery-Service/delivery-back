const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Agent = require("../models/Agent");

module.exports = function (passport) {
    // passport.use(
    //     new LocalStrategy(
    //         { usernameField: "email" },
    //         (email, password, done) => {
    //             // Match User
    //             Agent.findOne({ where: { email: email }})
    //                 .then((agent) => {
    //                     if (!agent) {
    //                         return done(null, false, {
    //                             message: "That email is not registered",
    //                         });
    //                     }

    //                     // Match password
    //                     bcrypt.compare(
    //                         password,
    //                         agent.password,
    //                         (err, isMatch) => {
    //                             if (err) throw err;
    //                             if (isMatch) {
    //                                 return done(null, agent);
    //                             } else {
    //                                 return done(null, false, {
    //                                     message: "Password incorrect",
    //                                 });
    //                             }
    //                         }
    //                     );
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     )
    // );
    // passport.use(
    //     new LocalStrategy(
    //         { usernameField: "email" },
    //         (email, password, done) => {
    //             console.log(email, password, done)
    //             Agent.findOne(
    //                 {where: { email: email }},
    //                 (err, user) => {
    //                     if (err) throw err;
    //                     if (!user) return done(null, false);
    //                     bcrypt.compare(
    //                         password,
    //                         user.password,
    //                         (err, isMatch) => {
    //                             if (err) throw err;
    //                             if (isMatch === true) {
    //                                 return done(null, user);
    //                             } else {
    //                                 return done(null, false);
    //                             }
    //                         }
    //                     );
    //                 }
    //             );
    //         }
    //     )
    // );

    passport.use(
        new LocalStrategy(
          { usernameField: "email" },
          async (email, password, done) => {
            try {
              const agent = await Agent.findOne({ where: { email: email } });
              if (!agent) {
                return done(null, false);
              }
              bcrypt.compare(password, agent.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch === true) {
                  return done(null, agent);
                } else {
                  return done(null, false);
                }
              });
            } catch (err) {
              return done(err);
            }
          }
        )
      );

    passport.serializeUser((agent, done) => {
        done(null, agent.id);
    });

    passport.deserializeUser((id, done) => {
        Agent.findByPk(id, (err, agent) => {
            done(err, agent);
        });
    });
};