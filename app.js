const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const port = 3000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
