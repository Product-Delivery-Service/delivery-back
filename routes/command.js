const { body } = require("express-validator");
const express = require("express");
const commandRouter = express.Router();
const commandController = require("../controllers/command");

const { ensureAuthenticated } = require("../middlewares/isAuth");

commandRouter.post(
    "/",
    [
        body("senderName").trim().not().isEmpty().withMessage("Sender Name is Required"),
        body("senderAddress").trim().not().isEmpty().withMessage("Sender Address is Required"),
        body("senderPhone").trim().not().isEmpty().withMessage("Sender Phone is Required"),
        body("senderEmail").trim().not().isEmpty().withMessage("Sender Email is Required"),
        body("receiverName").trim().not().isEmpty().withMessage("receiver Name is Required"),
        body("receiverAddress").trim().not().isEmpty().withMessage("receiver Address is Required"),
        body("receiverPhone").trim().not().isEmpty().withMessage("receiver Phone is Required"),
        body("receiverEmail").trim().not().isEmpty().withMessage("receiver Email is Required"),
        body("shipmentDate").trim().not().isEmpty().withMessage("Shipment Date is Required"),
        body("shipmentName").trim().not().isEmpty().withMessage("Shipment Name is Required"),
        body("shipmentCount").trim().not().isEmpty().withMessage("Shipment Count is Required"),
        body("shipmentValue").trim().not().isEmpty().withMessage("Shipment Value is Required"),
        body("shipmentPrice").trim().not().isEmpty().withMessage("Shipment Price is Required"),
        body("shipmentWeight").trim().not().isEmpty().withMessage("Shipment Weight is Required"),
        body("shipmentService").trim().not().isEmpty().withMessage("Shipment Service is Required"),
        body("shipmentState").trim().not().isEmpty().withMessage("Shipment State is Required"),
    ], 
    commandController.addCommand
);

commandRouter.get(
    "/",

    // ensureAuthenticated,
    commandController.getCommands
);

commandRouter.post(
    "/trackingCode",

    commandController.getCommandByTrackingCode
);

commandRouter.post(
    "/update",

    commandController.updateCommand
);

module.exports = commandRouter