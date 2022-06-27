var express = require("express");
var router = express.Router();

const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");

// router.get("/", async (req, res, next) => {
//   try {
//     const contacts = Contact.find().populate("group").exec();
//     res.status(200).json({
//       message: "Contacts fetched successfully!",
//       contacts: contacts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred",
//       error: error,
//     });
//   }
// });

router.get('/', (req, res, next) => {
  Contact.find()
  .populate('group')
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
  const maxContactId = sequenceGenerator.nextId("contacts");
  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
    group: req.body.group
  });

  try {
    const createdContact = await contact.save();
    res.status(201).json({
      contact: "Contact added successfully",
      contact: createdContact,
    });
  } catch (err) {
    res.status(500).json({
      contact: "An error occurred",
      error: err,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });
    contact.name = req.body.name;
    contact.description = req.body.description;
    contact.url = req.body.url;
    contact.group = req.body.group;

    try {
      const result = await Contact.updateOne({ id: req.params.id }, contact);
      res.status(204).json({
        contact: "Contact updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        contact: "An error occurred",
        error: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      contact: "Contact not found.",
      error: { contact: "Contact not found" },
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });

    try {
      const result = await Contact.deleteOne({ id: req.params.id });
      res.status(204).json({
        contact: "Contact deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        contact: "An error occurred",
        error: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      contact: "Contact not found.",
      error: { contact: "Contact not found" },
    });
  }
});

module.exports = router;
