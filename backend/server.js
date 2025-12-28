const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// safely load dotenv if available
try {
  require("dotenv").config();
} catch (e) {
  console.warn("dotenv not installed — using environment variables if present");
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/myhealthhub";

/* 🧑 Patient Schema */
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  condition: String,
  createdAt: { type: Date, default: Date.now }
});
const Patient = mongoose.model("Patient", PatientSchema);

/* Routes */
app.post("/patient", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ message: "Patient data saved successfully" });
  } catch (error) {
    console.error("Save patient error:", error);
    res.status(500).json({ error: "Failed to save patient data" });
  }
});

app.get("/patient", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error("Fetch patients error:", error);
    res.status(500).json({ error: "Failed to fetch patient data" });
  }
});

/* Start server after DB connects */
async function start() {
  try {
    // Connect without deprecated/unsupported options
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

start();