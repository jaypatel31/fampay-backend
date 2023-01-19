import express from "express";
import DotEnv from "dotenv";
import connection from "./database/db.js";
import "express-async-errors";
import globalErrorHandler from "./middlewares/errorMiddleware.js"
import router from "./routes/index.js"
import cors from "cors";
import cron from "node-cron"
import {google} from "googleapis" 
import VideoMaster from "./models/video/videoMaster.js"

const app = express();
DotEnv.config();

app.use(cors())

app.use(express.json());

// version 1 API
app.use('/api/v1', router)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 4000;


const start = async () => {
    try {
        await connection(process.env.MONGODB_URI);
        app.listen(PORT,()=>{
            console.log(`Listening on Port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        console.log("Failed to connect to the database, server is not running.");
    }
};
  
await start();

let publishedAfter = new Date(new Date().toDateString()).toISOString()

let lastVideoTime = await VideoMaster.findOne({},'postedOn').sort({postedOn:-1})

if(lastVideoTime){
    publishedAfter = new Date(lastVideoTime.postedOn)
    publishedAfter.setSeconds(publishedAfter.getSeconds()+2)
}

let job = false

cron.schedule("*/15 * * * * *", async function () {
    if(job){
        return
    }
    job = true
    console.log("Video Fetching Cron Job Started");
    try{

        const Googleservice = google.youtube({
            version: "v3",
            auth: process.env.YT_API_KEY,
        });

        const {data:{items}} = await Googleservice.search.list({
            part: "snippet",
            maxResults: 50,
            order: "date",
            q:"songs",
            relevanceLanguage:"en",
            publishedAfter:publishedAfter,
        });


        if(items.length>0){
            publishedAfter = new Date(items[0].snippet.publishedAt)
            publishedAfter.setSeconds(publishedAfter.getSeconds()+2)
        }

        let videosResources = items.map((item)=>{
                return {
                    videoId:item.id.videoId,
                    title:item.snippet.title,
                    description:item.snippet.description,
                    thumbnails:item.snippet.thumbnails,
                    channelTitle:item.snippet.channelTitle,
                    postedOn:item.snippet.publishedAt
                }
            })
            
            console.log(videosResources)

            let videosInsert = await VideoMaster.insertMany(videosResources)

            console.log("Video Fetching Cron Job Ended");
            console.log("----------------------------------");
            job=false
    }catch(e){
        console.log(e);
        console.log("Video Fetching Cron Job Ended");
        console.log("----------------------------------");
        job=false
    }
});