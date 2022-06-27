const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  // sender: { type: Schema.Types.ObjectId, ref: "Contact" },
  sender: { type: String },
});

module.exports = mongoose.model("Message", messageSchema);
