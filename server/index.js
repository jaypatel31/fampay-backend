import express, { response } from "express";
import DotEnv from "dotenv";
import connection from "./database/db.js";
import "express-async-errors";
import globalErrorHandler from "./middlewares/errorMiddleware.js"
import router from "./routes/index.js"
import cors from "cors";
import mongoose from "mongoose";
import { ytCron } from "./server/utils/ytCron.js";

const app = express();
DotEnv.config();

app.use(cors())

app.use(express.json());

// version 1 API
app.use('/api/v1', router)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 4000;


app.on('ready', function() { 
    app.listen(PORT,()=>{
        console.log(`Listening on Port ${PORT}`);
    })
    
    //Starting Cron Job
    ytCron()
});

connection(process.env.MONGODB_URI);

mongoose.connection.once('open', function() { 
    app.emit('ready'); 
})
