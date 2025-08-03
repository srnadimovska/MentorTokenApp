const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have username!"],
  },
  email: {
    type: String,
    required: [true, "User must have email!"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "User must have password"],
    
  },
  type: {
    type: String,
    enum: ["mentor", "startup", "admin"],
    required: true,
  },
  phone: {
    type: String,
  },
  skills:  [String],
  
  desc: {
    type: String,
  },
  acceptedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  representative: {
    type: String,
  },
  address: {
    type: String,
  },
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  photo: {
    type: String,
    default: 'default.jpg',
  },
  
}, {timestamps : true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
