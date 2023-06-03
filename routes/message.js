const { body } = require("express-validator");
const express = require("express");
const  messageRouter = express.Router();
const messageController = require("../controllers/message");

const { ensureAuthenticated } = require("../middlewares/isAuth");
messageRouter.post(
    "/create",
    [
        body("phoneNumber").trim().not().isEmpty().withMessage("Phone Number is Required"),
        body("fullName")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Full Name is Required"),
        body("message").trim().not().isEmpty().withMessage("Message is Required"),
    ],

    messageController.addMessage
);

messageRouter.get(
    "/",

    ensureAuthenticated,
    messageController.getMessages
);

module.exports = messageRouter