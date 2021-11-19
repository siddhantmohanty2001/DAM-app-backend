const router = require("express").Router();
const userController = require("../controllers/userController");
const upload=require('../utils/multer');
const cloudinary=require('../utils/cloudinary');
const User = require('../models/user');

router.post("/setProfilePic",upload.single('image'),async (req,res)=>{
    // console.log(req.files);

    // res.status(200).send({data:req.files});
    try{
        console.log(req.file);
        const result=await cloudinary.uploader.upload(req.file.path);
        // res.json(result);
        //create instance of user
        let user=new User({
            name:req.body.name,
            avatar:result.secure_url,
            cloudinary_id:result.public_id,
        });
        //save user
        await user.save();
        res.json(user);

        
    }catch(err){
        console.log(err);
    }
});

router.delete("/setProfilePic/:id", async (req, res) => {
    try {
      // Find user by id
      let user = await User.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
      // Delete user from db
      await user.remove();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.put("/setProfilePic/:id", upload.single("image"), async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
        name: req.body.name || user.name,
        avatar: result?.secure_url || user.avatar,
        cloudinary_id: result?.public_id || user.cloudinary_id,
      };
      user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/setProfilePic/:id", async (req, res) => {
    try {
      // Find user by id
      let user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });

//   router.get("/setProfilePic", (req,res) => {
//       res.send("Hello");
//   });
module.exports = router;