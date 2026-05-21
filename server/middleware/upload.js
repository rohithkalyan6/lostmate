const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

console.log("Configuring Cloudinary Storage for Multer in upload.js...");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lostmate_items",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});

module.exports = upload;
