const Command = require("../models/Command")

exports.addCommand = (req, res) => {
      let newCommand = {
        senderName: req.body.senderName,
        senderAddress: req.body.senderAddress,
        senderPhone: req.body.senderPhone,
        senderEmail: req.body.senderEmail,
        receiverName: req.body.receiverName,
        receiverAddress: req.body.receiverAddress,
        receiverPhone: req.body.receiverPhone,
        receiverEmail: req.body.receiverEmail,
        shipmentName: req.body.shipmentName,
        shipmentCount: req.body.shipmentCount,
        shipmentValue: req.body.shipmentValue,
        shipmentPrice: req.body.shipmentPrice,
        shipmentWeight: req.body.shipmentWeight,
        shipmentService: req.body.shipmentService,
        shipmentState: "Shipment Created",
        trackingCode: "ABC12345",
    };
      Command.create(newCommand)
        .then((command) => {
            res.status(201).json({
                success: true,
                message: "Command Created Successfully",
                data: command,
            });
        })
        .catch((err) =>
            res.status(400).json({
                success: false,
                message: "Failed to Create Command",
                error: err,
            })
        );
}

exports.getCommands = (req, res) => {
  Command.findAll()
        .then((commands) =>
        res.status(200).json({
            success: true,
            data: commands,
        })
      )
      .catch((err) =>
        res.status(400).json({
            success: false,
            message: "Could Not Find Commands",
            error: err,
        })
      );
}