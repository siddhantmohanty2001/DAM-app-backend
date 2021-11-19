const setProfilePic=(req,res,next)=>{
    console.log(req.body);

    res.status(200).send({data:req.body});
};

module.exports=setProfilePic;