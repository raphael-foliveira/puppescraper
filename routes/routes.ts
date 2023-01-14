import express from "express";
import ScraperController from "../controllers/Scraper.controller";

const router = express.Router();
const scraperController = new ScraperController();

router.route("/lenovo")
	.get(scraperController.getLenovoLaptops);

export default router;