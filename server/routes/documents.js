var express = require("express");
var router = express.Router();

const sequenceGenerator = require("./sequenceGenerator");
const Document = require("../models/document");

router.get("/", (req, res, next) => {
  Document.find().exec((err, documentList) => {
    if (err) {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    }
    return res.status(200).json(documentList);
  });
});

router.post("/", async (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");
  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  try {
    const createdDocument = await document.save();
    res.status(201).json({
      message: "Document added successfully",
      document: createdDocument,
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
    const document = await Document.findOne({ id: req.params.id });
    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    try {
      const result = await Document.updateOne({ id: req.params.id }, document);
      res.status(204).json({
        message: "Document updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Document not found.",
      error: { document: "Document not found" },
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const document = await Document.findOne({ id: req.params.id });

    try {
      const result = await Document.deleteOne({ id: req.params.id });
      res.status(204).json({
        message: "Document deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred",
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Document not found.",
      error: { document: "Document not found" },
    });
  }
});

module.exports = router;
