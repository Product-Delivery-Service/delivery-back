const { body } = require("express-validator");
const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");
const { ensureAuthenticated } = require("../middlewares/isAuth");

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

authRouter.post("/login", authController.login, (req, res) => {
    if (req.isAuthenticated()) {
        const currentUser = req.user;
        res.status(200).json({
            success: true,
            message: "You are logged in",
            data: {
                fullName: currentUser.fullName,
                email: currentUser.email,
            },
        });
    }
});

authRouter.get("/logout", ensureAuthenticated, (req, res) => {
    req.logout();
    res.send("log out");
});

authRouter.get("/user", ensureAuthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        const currentUser = req.user;
        res.status(200).json({
            fullName: currentUser.fullName,
            email: currentUser.email,
        });
    }
});


module.exports = authRouter