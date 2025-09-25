const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

router.get("/search", async (req, res) => {
  try {
    const { organ, city } = req.query;
    let query = {};

    if (organ) {
      query.availableOrgans = { $in: [new RegExp("^" + organ + "$", "i")] };
    }
    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const hospitals = await Hospital.find(query).limit(100);
    res.json(hospitals);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/hospitals/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });
    res.json(hospital);
  } catch (err) {
    console.error("Hospital fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/hospitals", async (req, res) => {
  try {
    const h = new Hospital(req.body);
    await h.save();
    res.status(201).json(h);
  } catch (err) {
    console.error("Add hospital error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
