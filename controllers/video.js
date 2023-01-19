import videoMaster from "../models/video/videoMaster.js";

export const getAllVideos = async (req, res, next) => {
    try{
        let pg = Math.sign(req.query.page-1)?Number(req.query.page-1):0;
        let perpageItem = Math.sign(req.query.size)?Number(req.query.size):10

        let totalItems = await videoMaster.countDocuments()
        let videos = await videoMaster.find().sort({postedOn:-1}).skip(pg*perpageItem).limit(perpageItem)

        res.status(200).json({ message: "This is the getAllVideos route", videos, success:true,pageNumber:pg+1,itemFetched:videos.length,totalItems });
    }catch(err){
        res.status(500).json({ message: "Something Went Wrong", success:false,err:err.message });
    }
};

export const searchVideos = async (req, res, next) => {
    try{
        let pg = Math.sign(req.query.page-1)?Number(req.query.page-1):0;
        let perpageItem = Math.sign(req.query.size)?Number(req.query.size):10
        let searchTerm = req.query.term
        
        if(!searchTerm){
            const err = new Error("Please Provide a Search Term")
            err.status = 400
            return next(err)
        }

        let totalItems = await videoMaster.countDocuments({
            $or:[
                {title:{$regex:searchTerm,$options:"i"}},
                {description:{$regex:searchTerm,$options:"i"}},
            ]
        })
        let videos = await videoMaster.find({
            $or:[
                {title:{$regex:searchTerm,$options:"i"}},
                {description:{$regex:searchTerm,$options:"i"}},
            ]
        }).sort({postedOn:-1}).skip(pg*perpageItem).limit(perpageItem)

        res.status(200).json({ message: "This is the searchVideos route", videos, success:true,pageNumber:pg+1,itemFetched:videos.length,totalItems });
    }catch(err){
        res.status(500).json({ message: "Something Went Wrong", success:false,err:err.message });
    }
};