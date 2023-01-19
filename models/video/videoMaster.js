import mongoose from "mongoose";

const videoMasterSchema = new mongoose.Schema({
    videoId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    thumbnails:{
        default: {
            url: String,
            width: Number,
            height: Number,
          },
          medium: {
            url: String,
            width: Number,
            height: Number,
          },
          high: {
            url: String,
            width: Number,
            height: Number,
          },
    },
    channelTitle:{
        type:String,
        required:true
    },
    postedOn:{
        type:Date
    }
},{
    timestamps:{createdAt:"createdAt"}
})

const videoMaster = mongoose.model("videoMaster",videoMasterSchema)

export default videoMaster;