import type { MarketIndex } from "../components/types/types";

export const MOCK_TOP_MOVERS = [
    {
        "symbol": "BNKK",
        "price": 3.721,
        "name": "Bonk, Inc.",
        "change": 3.605,
        "changesPercentage": 3107.75862,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 94223789,
        "sharesOutstanding": 185476000
    },
    {
        "symbol": "ATPC",
        "price": 0.1311,
        "name": "Agape ATP Corporation",
        "change": 0.0631,
        "changesPercentage": 92.79412,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 18405183,
        "sharesOutstanding": 50027000
    },
    {
        "symbol": "EURKR",
        "price": 0.4999,
        "name": "Eureka Acquisition Corp",
        "change": 0.2399,
        "changesPercentage": 92.26923,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 5688346,
        "sharesOutstanding": 6208000
    },
    {
        "symbol": "BTTC",
        "price": 5.95,
        "name": "Black Titan Corporation",
        "change": 2.63,
        "changesPercentage": 79.21687,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 1424833,
        "sharesOutstanding": 7723620
    },
    {
        "symbol": "BEAT",
        "price": 2.7083,
        "name": "HeartBeam, Inc.",
        "change": 1.1583,
        "changesPercentage": 74.72903,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 26943477,
        "sharesOutstanding": 34370370
    },
    {
        "symbol": "PETS",
        "price": 3.07,
        "name": "PetMed Express, Inc.",
        "change": 1.3,
        "changesPercentage": 73.44633,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 13621186,
        "sharesOutstanding": 20596370
    },
    {
        "symbol": "AXIL",
        "price": 8.42,
        "name": "AXIL Brands, Inc.",
        "change": 3.4,
        "changesPercentage": 67.72908,
        "exchange": "AMEX",
        "type": "GAINER",
        "floatShares": 3446571,
        "sharesOutstanding": 6754750
    },
    {
        "symbol": "SMX",
        "price": 218.72,
        "name": "SMX (Security Matters) Public Limited Company",
        "change": 72.42,
        "changesPercentage": 49.50103,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 826199,
        "sharesOutstanding": 1270000
    },
    {
        "symbol": "DHIL",
        "price": 170.25,
        "name": "Diamond Hill Investment Group, Inc.",
        "change": 52.77,
        "changesPercentage": 44.91828,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 2449703,
        "sharesOutstanding": 2723266
    },
    {
        "symbol": "MIGI",
        "price": 9.56,
        "name": "Mawson Infrastructure Group, Inc.",
        "change": 2.86,
        "changesPercentage": 42.68657,
        "exchange": "NASDAQ",
        "type": "GAINER",
        "floatShares": 875908,
        "sharesOutstanding": 982964
    },
    {
      "symbol": "JZXN",
      "price": 5.05,
      "name": "Jiuzi Holdings, Inc.",
      "change": -0.942,
      "changesPercentage": -15.72096,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 55013450,
      "sharesOutstanding": 57372500
    },
    {
      "symbol": "STKH",
      "price": 2.7789,
      "name": "Steakholder Foods Ltd.",
      "change": -0.5111,
      "changesPercentage": -15.53495,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 497651,
      "sharesOutstanding": 681000
    },
    {
      "symbol": "ARTMX",
      "price": 33.57,
      "name": "Artisan Mid Cap Fund Inv Shs",
      "change": -6.02,
      "changesPercentage": -15.20586,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 0,
      "sharesOutstanding": 96155940
    },
    {
      "symbol": "APFDX",
      "price": 19.91,
      "name": "Artisan Global Discovery Fund - Investor Shares",
      "change": -3.57,
      "changesPercentage": -15.20443,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 0,
      "sharesOutstanding": 8960687
    },
    {
      "symbol": "ARBK",
      "price": 0.1301,
      "name": "Argo Blockchain plc",
      "change": -0.0229,
      "changesPercentage": -14.96732,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 61115555,
      "sharesOutstanding": 68694286
    },
    {
      "symbol": "RDAC",
      "price": 9.12,
      "name": "Rising Dragon Acquisition Corp.",
      "change": -1.6,
      "changesPercentage": -14.92537,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 5307533,
      "sharesOutstanding": 7499375
    },
    {
      "symbol": "HOOI",
      "price": 14.3795,
      "name": "Defiance Leveraged Long Income HOOD ETF",
      "change": -2.5105,
      "changesPercentage": -14.86382,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": null,
      "sharesOutstanding": null
    },
    {
      "symbol": "WHLR",
      "price": 3.355,
      "name": "Wheeler Real Estate Investment Trust, Inc.",
      "change": -0.565,
      "changesPercentage": -14.41327,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 6439171,
      "sharesOutstanding": 6859085
    },
    {
      "symbol": "HEPA",
      "price": 0.0685,
      "name": "Hepion Pharmaceuticals, Inc.",
      "change": -0.0115,
      "changesPercentage": -14.375,
      "exchange": "NASDAQ",
      "type": "LOSER",
      "floatShares": 11620317,
      "sharesOutstanding": 11620317
    },
    {
      "symbol": "GDXD",
      "price": 8.575,
      "name": "MicroSectors Gold Miners -3X Inverse Leveraged ETNs",
      "change": -1.4315,
      "changesPercentage": -14.3057,
      "exchange": "AMEX",
      "type": "LOSER",
      "floatShares": 0,
      "sharesOutstanding": 2832050
    }
];

export const MOCK_INDEXES: MarketIndex[] = [
    { id: '1', name: 'S&P 500', symbol: 'SPX', price: 4500.25, changePct: 0.5 },
    { id: '2', name: 'Dow Jones', symbol: 'DJI', price: 35000.75, changePct: -0.3 },
    { id: '3', name: 'NASDAQ', symbol: 'IXIC', price: 15000.10, changePct: 1.2 },
    { id: '4', name: 'FTSE 100', symbol: 'FTSE', price: 7000.50, changePct: -0.1 },
];