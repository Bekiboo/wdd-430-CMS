var express = require("express");
var router = express.Router();

const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");

router.get("/", (req, res, next) => {
  Message.find()
  // .populate('sender')
  .exec((err, result) => {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      return res.status(200).json(result);
  });
});

router.post("/", async (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");
  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender || '101',
  });

  try {
    const createdMessage = await message.save();
    res.status(201).json({
      message: "Message added successfully",
      message: createdMessage,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred",
      error: err,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const message = await Message.findOne({ id: req.params.id });
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;

    try {
      const result = await Message.updateOne({ id: req.params.id }, message);
      res.status(204).json({
        message: "Message updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Message not found.",
      error: { message: "Message not found" },
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const message = await Message.findOne({ id: req.params.id });

    try {
      const result = await Message.deleteOne({ id: req.params.id });
      res.status(204).json({
        message: "Message deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Message not found.",
      error: { message: "Message not found" },
    });
  }
});

module.exports = router;
