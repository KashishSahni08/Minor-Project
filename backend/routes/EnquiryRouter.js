const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const enquirySchema = new mongoose.Schema(
  {
    hospitalId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    organ: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ error: "Failed to save enquiry" });
  }
});

router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Enquiry not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating enquiry:", err);
    res.status(500).json({ error: "Failed to update enquiry" });
  }
});

module.exports = router;
