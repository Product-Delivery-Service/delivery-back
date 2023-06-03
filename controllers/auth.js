const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Agent = require("../models/Agent")

exports.signUp = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, message: errors });
    }
    let newAgent = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
    };
    Agent.create(newAgent)
        .then((agent) => {
            res.status(201).json({
                success: true,
                message: "Agent Created Successfully",
                data: {
                    fullName: agent.fullName,
                    email: agent.email,
                },
            });
        })
        .catch((err) =>
            res.status(500).json({ success: false, message: err })
        );
};


exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: errors });
  }
  Agent.findOne({where: { email: req.body.email }})
      .then((agent) => {
          if (!agent) {
              return res.status(401).json({
                  success: false,
                  message: "An agent with this email could not be found.",
              });
          } else {
              passport.authenticate("local")(req, res, next);
          }
      })
      .catch((err) => {
          res.status(500).json({ success: false, message: err });
      });
};
