const { body } = require("express-validator");
const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");

const Agent = require("../models/Agent")

authRouter.post(
    "/signup",
    [
        body("fullName")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Full Name is Required")
            .isString()
            .withMessage("Full Name must be a String"),
        body("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Password is Required"),
        body("email")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Email is Required")
            .custom((value) => {
                return Agent.findOne({ where: { email: value } }).then(
                    (userDoc) => {
                        if (userDoc) {
                            return Promise.reject("Email already exists!");
                        }
                    }
                );
            }),
    ],

    authController.signUp
);

authRouter.post("/login", authController.login);

module.exports = authRouter