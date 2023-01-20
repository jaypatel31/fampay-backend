import mongoose from "mongoose";

const apiKeyMasterSchema = new mongoose.Schema({
    apiKey:{
        type:String,
        required:true,
    },
    currentStatus:{
        type:Boolean,
    }
},{
    timestamps:{createdAt:"createdAt"}
})

const apiKeyMaster = mongoose.model("apiKeyMaster",apiKeyMasterSchema)

export default apiKeyMaster;