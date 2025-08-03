const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Job title is required!"],
  },
  description: {
    type: String,
    required: [true, "Job must have description!"],
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["Direct", "Open"],
    default: "Open",
  },
}, {timestamps: true});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
