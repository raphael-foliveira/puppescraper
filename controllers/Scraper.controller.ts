import { Request, Response } from "express";
import setupScraper from "../services/scraper.service";

export default class ScraperController {
	async getLenovoLaptops(req: Request, res: Response) {
		const brand = req.params.brand || "Lenovo";
		const scraper = await setupScraper();
		
		const products = await scraper.run(brand);
		
		return res.status(200).json({
			products
		});
	}
}