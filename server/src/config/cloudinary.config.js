const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dfua5nwki",
  api_key: "255858292935663",
  api_secret: "by3LYDCMZ5unE8MfaogkME_evPE",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "imgmovie",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
