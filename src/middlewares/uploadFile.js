const multer = require("multer");

exports.uploadFile = (imageFile) => {
  // initialization multer diskstorage
  // make destination file for upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); //file storage location
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "")); // rename filename by date now + original filename
    },
  });

  // function for file filter based on extension
  const fileFilter = function (req, file, cb) {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMB = 10;
  const maxSize = sizeInMB * 1000 * 1000; // Maximum file size in MB

  // generate multer instance for upload include storage, validation and max file size
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  // middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      // show an error if validation failed
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      // show an error if file doesn't provided in req
      // if (!req.file && !err)
      //   return res.status(400).send({
      //     message: "Please select files to upload",
      //   });

      // show an error if it exceeds the max size
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10MB",
          });
        }
        return res.status(400).send(err);
      }

      // if okay next to controller
      // in the controller we can access using req.file
      return next();
    });
  };
};
