const multer = require("multer");

// Define storage for Multer (to store uploaded files)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files uploaded.");
  }

  res.status(200).json({ message: "Files uploaded successfully!" });
});
