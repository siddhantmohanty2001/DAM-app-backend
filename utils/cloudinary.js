const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name:'dnwt6flkr',
  api_key: '288967268616471',
  api_secret: '8IHHQHmO7rcP9pSy_UHmh0ow7u4',
});

module.exports = cloudinary;