const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  distance: String,
  availableOrgans: [String],
  city: String,
  organsCount: Number,
  phone: String,
  emergency: { type: Boolean, default: false },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
