const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
      console.log(file);
      let ext=file.originalname;
    // let ext = path.extname(file.originalname);  
    // console.log(ext);
    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png"&& ext !== "tiff"&& ext !== "bmp"&& ext !== "gif"&& ext !== "eps") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});