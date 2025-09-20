const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("express-jwt");
const db = require("./pkg/db/index");
const auth = require("./handlers/authHandler");
const user = require("./handlers/usersHandler");
const job = require("./handlers/jobsHandler");
const application = require("./handlers/applicationHandler");

// for multer
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

dotenv.config({ path: `${__dirname}/config.env` });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

db.init();

app.post("/api/v1/register", upload.single("photo"), auth.signup);
app.post("/api/v1/login", auth.login);

app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ["/api/v1/register", "/api/v1/login"],
    })
);

app.patch("/api/v1/uploadphoto/:id", user.uploadUserPhoto, user.update);
app.get("/api/v1/user", user.getAllUsers);
app.get("/api/v1/user/:id", user.getUserbyId);
app.delete("/api/v1/user/:id", user.deleteUser);

app.get('/api/v1/jobs', job.getAllJobs);
app.get('/api/v1/jobs/:id', job.getOneJob);
app.post('/api/v1/job', job.create);
app.patch('/api/v1/job/:id', job.updateJob);
app.delete('/api/v1/job/:id', job.deleteJob);

app.get('/api/v1/application', application.getAllApps);
app.get('/api/v1/application/:id', application.getOneApp);
app.post('/api/v1/application', application.create);
app.get('/api/v1/application/mentor/:id', application.applicationByMentor);
app.patch('/api/v1/application/:id', application.updateApp);
app.delete('/api/v1/application/:id', application.deleteApp);
app.get("/api/v1/mentor/offers", application.getMentorOffersJob);
app.get("/api/v1/startup/applications", application.getApplicationsForStartup);
app.get("/api/v1/startup/top-mentors", application.getTopMentorsForStartup);


app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err.message, "Server can not start");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
