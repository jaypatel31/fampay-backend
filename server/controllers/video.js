import apiKeyMaster from "../models/video/apiKeyMaster.js";
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
        let titleTerm = req.query.title
        let descriptionTerm = req.query.description
        let searchTerm = {
            $and:[]
        }
        
        if(titleTerm){
            let regex = titleTerm.replace(
                /[/\-\\^$*+?.()|[\]{}]/g,
                "\\$&"
              );
            searchTerm['$and'].push({title:{$regex:regex,$options:"gi"}})
        }
        if(descriptionTerm){
            let regex = descriptionTerm.replace(
                /[/\-\\^$*+?.()|[\]{}]/g,
                "\\$&"
              );
            searchTerm['$and'].push({description:{$regex:regex,$options:"gi"}})
        }
        if(!titleTerm && !descriptionTerm){
            const err = new Error("Please Provide a Search Term in form of title or description")
            err.status = 400
            return next(err)
        }

        let totalItems = await videoMaster.countDocuments({
            ...searchTerm
        })
        let videos = await videoMaster.find({
            ...searchTerm
        }).sort({postedOn:-1}).skip(pg*perpageItem).limit(perpageItem)

        res.status(200).json({ message: "This is the searchVideos route", videos, success:true,pageNumber:pg+1,itemFetched:videos.length,totalItems });
    }catch(err){
        res.status(500).json({ message: "Something Went Wrong", success:false,err:err.message });
    }
};

export const addApiKey = async (req, res, next) => {
    try{
        let apiKey = req.body.apiKey

        if(!apiKey){
            const err = new Error("Please Provide a API Key")
            err.status = 400
            return next(err)
        }

        let insertApiKey = await apiKeyMaster.create({
            apiKey
        })

        res.status(200).json({ message: "Added the new API Key", success:true});
    }catch(err){
        res.status(500).json({ message: "Something Went Wrong", success:false,err:err.message });
    }
}