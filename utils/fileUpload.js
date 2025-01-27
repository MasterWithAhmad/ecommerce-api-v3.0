// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedTypes.test(file.mimetype);
//   if (ext && mimeType) return cb(null, true);
//   cb(new Error('Only images are allowed'));
// };

// const upload = multer({ storage, fileFilter });
// module.exports = { upload };


const multer = require('multer');
const path = require('path');

// Define storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter to allow only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed'), false); // Reject the file
  }
};

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter,
});

module.exports = { upload };

