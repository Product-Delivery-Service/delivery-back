const Message = require("../models/Message")

exports.addMessage = (req, res) => {
  let newMessage = {
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    trackingCode: req.body.trackingCode,
    fullName: req.body.fullName,
    message: req.body.message,
};
  Message.create(newMessage)
    .then((message) => {
        res.status(201).json({
            success: true,
            message: "Message Created Successfully",
            data: message,
        });
    })
    .catch((err) =>
        res.status(400).json({
            success: false,
            message: "Failed to Create Message",
            error: err,
        })
    );
}

exports.getMessages = (req, res) => {
  Message.findAll()
        .then((messages) =>
        res.status(200).json({
            success: true,
            message: "Messages Fetched Successfully",
            data: messages,
        })
      )
      .catch((err) =>
        res.status(400).json({
            success: false,
            message: "Could Not Find Messages",
            error: err,
        })
      );
}