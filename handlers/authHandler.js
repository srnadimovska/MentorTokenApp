const User = require("../pkg/model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      type,
      phone,
      skills,
      desc,
      representative,
      address,
    } = req.body;
    console.log(req.body);

    let photoFilename = null;
    if (req.file) {
      photoFilename = req.file.filename;
    }

    
    if (
      type === "mentor" &&
      (req.body.representative || req.body.address || req.body.jobsPosted)
    ) {
      return res.status(400).json({
        message:
          "Mentor can not include representative,address or jobs posted!",
      });
    }

    if (
      type === "startup" &&
      (req.body.skills || req.body.phone || req.body.acceptedJobs)
    ) {
      return res.status(400).json({
        message: "Startup can not include skills,phone or accepted jobs!",
      });
    }
    
    
    
    const newUser = await User.create(
      {
      name: name || "",
      email,
      password,
      type,
      phone,
      skills,
      desc,
      representative,
      address,
      photo: photoFilename,
    }
    );
    // vo zavisnost koj type e,kreirame objekt od req.body i go stavame vo await yser create(if else)

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please enter email or password!");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password!");
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
