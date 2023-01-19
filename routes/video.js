import express from "express";
import { getAllVideos, searchVideos } from "../controllers/video.js"

const router = express.Router()

router.route('/search').get(searchVideos)
router.route('/').get(getAllVideos)

export default router