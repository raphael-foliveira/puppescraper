import puppeteer, { Browser, Page } from "puppeteer";
import { ProductInfo, ProductPrice } from "../types/types";

class ScraperService {
	page: Page;
	browser: Browser;

	constructor(browser:Browser,page: Page) {
		this.page = page;
		this.browser = browser;
	}

	async run(brand: string) {
		await this.goToPage();
		const productUrls = await this.getProductLinks(brand);

		const products: ProductInfo[] = [];
		for (const url of productUrls) {
			const productDetails = await this.getProductDetails(url);
			products.push(productDetails);
		}
		this.browser.close();
		const filteredProducts = products.filter(p => p.description.toLowerCase().includes(brand.toLowerCase()));
		filteredProducts.sort((a, b) => {
			return a.prices[0].price - b.prices[0].price;
		});
		return filteredProducts;
	}

	async goToPage() {
		await this.page.setViewport({width: 0, height:0});
		await this.page.goto("https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops");
	}
	
	async getProductLinks(brand: string) {
		await this.page.waitForSelector(`a[title*="${brand}"i]`);
		const productUrls = await this.page.$$eval(`a[title*="${brand}"i]`, (elements) => {
			return elements.map((e) => {
				return e.href;
			});
		});
		return productUrls;
	}
	
	async getProductDetails(productUrl: string): Promise<ProductInfo> {
		await this.page.goto(productUrl);
		await this.page.waitForSelector("div.caption");
		const model = await this.page.$eval(`div.caption > h4:nth-child(2)`, (titleElement) => titleElement.innerText);
		const description = await this.page.$eval(`p.description`, (descriptionElement => descriptionElement.innerText));
		const prices = await this.getProductPrices();
		const rating = await this.page.$$eval(`div.ratings span.glyphicon-star`, (stars) => stars.length);
		const numberOfReviews = await this.page.$eval(`div.ratings p`, (numberOfReviewsElement) => parseInt(numberOfReviewsElement.innerText));
		return {
			model,
			prices,
			description,
			rating,
			numberOfReviews,
			url: productUrl
		};
	}

	async getProductPrices(): Promise<ProductPrice[]> {
		const hddOptions = await this.page.$$(`button.swatch:not(.disabled)`);

		const prices: ProductPrice[] = [];
		for (const option of hddOptions) {
			await option.click();
			const hdd = await option.getProperty("value").then((handle) => handle.jsonValue());
			const price = await this.page.$eval(`h4.price`, (price) => parseFloat(price.innerText.replace("$","")));
			prices.push({
				hdd,
				price
			});
		}
		return prices;
	}
}

const setupScraper = async () => {
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	const scraperService = new ScraperService(browser, page);
	return scraperService;
};

export default setupScraper;


    

    
