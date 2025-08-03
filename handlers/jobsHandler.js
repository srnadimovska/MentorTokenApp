const Job = require("../pkg/model/jobSchema");

exports.create = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    console.log(newJob);

    res.status(201).json({
      status: "success",
      data: {
        newJob,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find();
    res.status(200).json({
      status: "success",
      data: {
        allJobs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
