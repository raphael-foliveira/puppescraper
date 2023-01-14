import puppeteer from "puppeteer";

export const runScraper = async () => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();
	await page.goto("https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops");
	return await page.waitForSelector(`//a[contains(@title, "lenovo")]`);
};

    

    
