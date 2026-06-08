import multer from "multer";
import path from "path";

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

// File Filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Only PDF files are allowed"
//       ),
//       false
//     );
//   }
// };

const fileFilter = (
  req,
  file,
  cb
) => {
  console.log(
    "Uploaded File:",
    file
  );

  cb(null, true);
};

// Upload Middleware
const upload = multer({
  storage,
  fileFilter,
});

export default upload;