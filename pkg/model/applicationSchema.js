const { application } = require('express');
const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required: true,
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    applicationType: {
        type: String,
        enum: ["mentorToCompany","companyTiMentor"],
        required: true,
    },
    status: {
        type: String,
        default:"pending",
    },
    acceptedStatus:{
        type: String,
        enum: ["done","rejected","in progress"],
        default:"in progress",
    },
}, {timestamps: true});

const Application = mongoose.model("Application", appSchema);
module.exports = Application;
