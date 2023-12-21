const Data = require("../models/appModel")


//GET notes

exports.getData = async(req, res, next)=>{
    if(!req.user){
        return res.status(401).json({message:'unauthorised'})
    } 
    
    try{
        const data = await Data.find({user_id:req.user.user_id})
        res.status(200).json({data})
    }catch(err){
        return  res.status(404).json({message:'couldnt find any notes, possible reasons: accessToken not authorized'})
    }
}
