const User = require("../pkg/model/UserSchema");

const multer = require("multer");
const uuid = require("uuid");



const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    const imageId = uuid.v4();
    callback(null, `user-${imageId}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("File type is not supported"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single("photo");

exports.update = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file) {
      const fileName = req.file.filename;
      req.body.photo = fileName;
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);

    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getUserbyId = async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user,
            }
        });
    } catch(err){
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.deleteUser = async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'success',
            data: {
                user,
            }
        });
    } catch(err) {
        res.status(500).json({
            status:'fail',
            message:err.message,
        });
    }
};