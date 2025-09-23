const Application = require("../pkg/model/applicationSchema");
const Job = require("../pkg/model/jobSchema");
const User = require("../pkg/model/UserSchema");
const mongoose = require('mongoose');

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
      data: 
        app,
      
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

exports.applicationByMentor = async (req, res) => {
  
  try {
    const mentorId = req.auth.id;  
    const userType = req.auth.userType;
    console.log("Auth info:", req.auth);

    if (userType !== "mentor") {
      return res.status(403).json({
        status: "fail",
        message: "Only mentors allowed!",
      });
    }

    const applications = await Application.find({ mentorId })
      .populate("jobId", "title description")
      .populate("companyId", "name email");

    res.status(200).json({
      status: "success",
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMentorOffersJob = async(req,res) => {
  try {
    const mentorId = req.auth.id;
    if (!mentorId) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: no mentor ID in token",
      });
    }
    const offers = await Application.find({
      mentorId,
      applicationType: "companyToMentor",
      status:"pending",
    })
    .populate("jobId", "title description").populate("companyId","name photo");

    res.status(200).json({
      status:"success",
      data: {
        offers,
      },
    });
  } catch(err){
    res.status(500).json({
      status:'fail',
      message:err.message,
    });
  }
};

exports.getApplicationsForStartup = async (req, res) => {
  try {
    const startupId = req.auth.id;  
    const userType = req.auth.userType;
    console.log("Auth info:", req.auth);


    if (userType !== "startup") {
      return res.status(403).json({
        status: "fail",
        message: "Only startups allowed!",
      });
    }

    const apps = await Application.find({ companyId: startupId })
      .populate("jobId", "title description")
      .populate("mentorId", "name email photo");

    res.status(200).json({
      status: "success",
      data: apps,
    });
  } catch (err) {
    console.log('Startup apps error',err)
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};



exports.topMentors = async (req, res) => {
  try {
    const companyId = req.auth.id; // startup id

    const mentors = await Application.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
          acceptedStatus: "done", // ✅ not status
        },
      },
      {
        $group: {
          _id: "$mentorId",
          achievedJobs: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "mentor",
        },
      },
      {
        $unwind: "$mentor",
      },
      {
        $project: {
          _id: 0,
          mentorId: "$mentor._id",
          name: "$mentor.name",
          photo: "$mentor.photo",
          achievedJobs: 1,
        },
      },
      { $sort: { achievedJobs: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      status: "success",
      data: mentors,
    });
  } catch (err) {
    console.error("Top mentors error:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

