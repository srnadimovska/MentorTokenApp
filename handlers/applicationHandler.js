const Application = require("../pkg/model/applicationSchema");

exports.create = async (req, res) => {
  try {
    const newApp = await Application.create(req.body);
    console.log(newApp);

    res.status(201).json({
      status: "success",
      data: {
        newApp,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllApps = async (req, res) => {
  try {
    const allApps = await Application.find()
      .populate("jobId")
      .populate("mentorId")
      .populate("companyId");

    res.status(200).json({
      status: "success",
      data: {
        allApps,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneApp = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id)
    .populate("jobId")
      .populate("mentorId")
      .populate("companyId");

      if (!app) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        app,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateApp = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        app,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteApp = async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        app,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
