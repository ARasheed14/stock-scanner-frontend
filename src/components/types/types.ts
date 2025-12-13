export type Sentiment = "positive" | "negative" | "neutral";

export type MarketIndex = {
    id: string;
    name: string;
    symbol: string;
    price: number;
    changePct: number;
};

export type StockRow = {
  id: string;
  symbol: string;
  last: number;
  changePercent: number;
  volume: number;
  exchange: string;
  floatShares?: number;
};

export type ScanResultItem = {
  symbol?: string;
  price?: number;
  changesPercentage?: number;
  volume?: number;
  exchange?: string;
  floatShares?: number;
};

export type NewsItem = {
    id: string;
    headline: string;
    summary?: string;
    source: string;
    timeAgo: string;
    symbol?: string;
    sentiment?: Sentiment;
    Rating?: string;
};
