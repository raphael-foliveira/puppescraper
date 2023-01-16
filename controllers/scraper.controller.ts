import { Request, Response } from "express";
import setupScraper from "../services/scraper.service";

export default class ScraperController {
	async getLaptops(req: Request, res: Response) {
		const brand = req.params.brand || "Lenovo";
		const scraper = await setupScraper();
		
		const products = await scraper.run(brand);

		if (products.length === 0) {
			return res.status(504).json({
				error: "Request timed out."
			});
		}
		
		return res.status(200).json({
			products
		});
	}
}