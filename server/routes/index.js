import express from "express";

import videoRoute from "./video.js"

const app = express();

//Video Route
app.use("/video",videoRoute)

export default app

