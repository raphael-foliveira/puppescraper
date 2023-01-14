import express from "express";
import ScraperController from "../controllers/scraper.controller";

const router = express.Router();
const scraperController = new ScraperController();

router.route("/:brand?")
	.get(scraperController.getLaptops);

export default router;