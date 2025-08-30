const Application = require("../pkg/model/applicationSchema");
const Job = require("../pkg/model/jobSchema");
const User = require("../pkg/model/UserSchema");

exports.create = async (req, res) => {
  try {

    const userId = req.auth.id;
    const {jobId, mentorId, jobData} = req.body;
    const userType = req.auth.userType;

    let newApp;

    if(userType === 'mentor'){

      if(!jobId) {
      return res.status(400).json(
        {
          status:"fail",
          message:"Job ID is required"
        }
      );
    }
    const job = await Job.findById(jobId);
    if(!job) {
      return res.status(400).json({
        status:"fail",
        message:"Job not found"
      });
    }
    const companyId = job.companyId;

     newApp = await Application.create({
      mentorId: userId,
      jobId,
      companyId, 
      applicationType:"mentorToCompany"
    });
    console.log(newApp);


    } else if (userType === "startup"){
      if(!mentorId) {
        return res.status(400).json({
          status:"fail",
          message:"Mentor Id is required!",
        })
      }

      const mentor = await User.findById(mentorId)
      if(!mentor){
        res.status(400).json({
          status:"fail",
          message: "Mentor not found",
        })
      }
      let newJob = jobId;

      if(!jobId && jobData){
        const job = await Job.create({
          ...jobData,
          companyId: userId,
        });
        newJob = job._id;
      } else if(!jobId){
        return res.status(400).json({
          status:"fail",
          message: "Job Id is required!",
        })
      };

      newApp = await Application.create({
        mentorId,
        companyId: userId,
        jobId: newJob,
        applicationType:"companyToMentor",
        status:"pending",
      });
    } else {
      return res.status(400).json({
        status:"fail",
        message: "Invalid!",
      })
    }
    
    res.status(201).json({
      status: "success",
      data: {
        newApp,
      },
    });
  } catch (err) {
    console.log("Application create error",err)
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
