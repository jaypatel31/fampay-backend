import cron from "node-cron"
import {google} from "googleapis" 
import VideoMaster from "../models/video/videoMaster.js"
import apiKeyMaster from "../models/video/apiKeyMaster.js"

export const ytCron = async () => {

    // Setting PublishedAfter Time for YT API
    let publishedAfter = new Date(new Date().toDateString()).toISOString()

    let lastVideoTime = await VideoMaster.findOne({},'postedOn').sort({postedOn:-1})

    if(lastVideoTime){
        publishedAfter = new Date(lastVideoTime.postedOn)
        publishedAfter.setSeconds(publishedAfter.getSeconds()+2)
    }

    let job = false
    
    // Fetching the Latest Active key 
    const fetchApiKey = async () => {
        let apiKeyFetch = await apiKeyMaster.findOneAndUpdate({
            $or:[
                {currentStatus:true},
                {currentStatus:{$ne:false}}
            ]
        },{
            currentStatus:true
        },{
            new:true
        })
        return apiKeyFetch?apiKeyFetch.apiKey:null
    }

    // To Update API Key
    const updateApiKey = async () => {
        let DeactivateKey = await apiKeyMaster.findOneAndUpdate({
            apiKey:apiKey
        },{
            currentStatus:false
        })

        let apiNewKeyFetch = await apiKeyMaster.findOneAndUpdate({
            currentStatus:{$ne:false}
        },{
            currentStatus:true
        },{
            new:true
        })
        
        return apiNewKeyFetch?apiNewKeyFetch.apiKey:null
    }

    let apiKey = await fetchApiKey()

    //Cron Job runs every 15 sec
    cron.schedule("*/15 * * * * *", async function () {
        if(job){
            return
        }
        if(apiKey==null){
            console.log("No API Key Found Or All API Keys are Expired.")
            apiKey = await fetchApiKey()
            return
        }
        job = true
        console.log("Video Fetching Cron Job Started");

        try{

            const Googleservice = google.youtube({
                version: "v3",
                auth: apiKey,
            });

            const response = await Googleservice.search.list({
                part: "snippet",
                maxResults: 50,
                order: "date",
                q:"songs",
                relevanceLanguage:"en",
                publishedAfter:publishedAfter,
            });
            
            let items  = response.data.items
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
                
                // console.log(videosResources)

                let videosInsert = await VideoMaster.insertMany(videosResources,{ordered:false})

                console.log("Video Fetching Cron Job Ended");
                console.log("----------------------------------");
                job=false

        }catch(e){

            console.log(e.message);

            if(e.response && e.response.status===403){
                console.log("API Key Expired. Updating Key...")
                let updatedKey = await updateApiKey()
                apiKey = updatedKey
            }
            console.log("Video Fetching Cron Job Ended");
            console.log("----------------------------------");
            job=false

        }
    });
}