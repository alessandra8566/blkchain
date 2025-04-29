import { StockAccount, StockBuyPayload, StockTransferPayload } from "@/utils/types/stock";
import { request } from "./request";

// 獲取所有股票帳戶
export const getAccounts = () => request.get<StockAccount>("/stocks/accounts");

// 買股票
export const postBuyStocks = (payload: StockBuyPayload) =>
  request.post<StockAccount>("/stocks/buy", payload);

// 買股票
export const transferStocks = (payload: StockTransferPayload) =>
  request.post<StockAccount>("/stocks/transfer", payload);
