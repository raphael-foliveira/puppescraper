import {Request, Response} from "express";
import { runScraper } from "../services/scraper.service";

export default class ScraperController {
	async getLenovoLaptops(req: Request, res: Response) {
		const elements = await runScraper();
		return res.status(200).json({
			elements
		});
	}
}