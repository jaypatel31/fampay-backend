import express from "express";
import { getAllVideos, searchVideos, addApiKey } from "../controllers/video.js"

const router = express.Router()

router.route('/search').get(searchVideos)
router.route('/').get(getAllVideos)
router.route('/addkey').post(addApiKey)

export default router