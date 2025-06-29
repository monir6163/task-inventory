const multer = require("multer");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./public/temp");
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(file.mimetype);
    if (extname) {
      return cb(null, true);
    } else {
      cb("Error: File type not supported!");
    }
  },
});

module.exports = {
  upload,
};
