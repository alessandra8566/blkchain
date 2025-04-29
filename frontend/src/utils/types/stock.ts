export interface StockAccount {
  remainingStock: string;
	accounts: {
		address: string;
		ethBalance: string;
		stockBalance: string;
	}[]
}

export interface StockBuyPayload {
	buyer: string;
	amounts: number;
}

export interface StockTransferPayload {
	from_account: string;
	to_account: string;
	amounts: number;
}