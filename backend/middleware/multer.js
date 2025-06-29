const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Error: File upload only supports the following filetypes - " +
            filetypes
        )
      );
    }
  },
});

const uploadSingle = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
        status: false,
        data: null,
      });
    }
    next();
  });
};

const uploadMultiple = (req, res, next) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
        status: false,
        data: null,
      });
    }
    next();
  });
};

module.exports = {
  uploadSingle,
  uploadMultiple,
};
