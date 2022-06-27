const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  imageUrl: { type: String },
  // group: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
  group: {},
});

module.exports = mongoose.model("Contact", contactSchema);
