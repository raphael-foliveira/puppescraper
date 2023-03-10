export interface ProductInfo {
	model: string
	description: string
	prices: ProductPrice[]
	rating: number
	numberOfReviews: number
	url: string
}

export interface ProductPrice {
    hdd: string
    price: number
}