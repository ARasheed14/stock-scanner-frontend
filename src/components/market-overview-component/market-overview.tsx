import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export type MarketIndex = {
    id: string;
    name: string;
    symbol: string;
    price: number;
    changePct: number;
};

type MarketOverviewProps = {
    items?: MarketIndex[];
};

const mockData: MarketIndex[] = [
    { id: '1', name: 'S&P 500', symbol: 'SPX', price: 4500.25, changePct: 0.5 },
    { id: '2', name: 'Dow Jones', symbol: 'DJI', price: 35000.75, changePct: -0.3 },
    { id: '3', name: 'NASDAQ', symbol: 'IXIC', price: 15000.10, changePct: 1.2 },
    { id: '4', name: 'FTSE 100', symbol: 'FTSE', price: 7000.50, changePct: -0.1 },
];

export default function MarketOverview({ items = mockData }: MarketOverviewProps) {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                Market Overview
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'stretch' }}>
                {items.map((item) => {
                    const isPositive = item.changePct >= 0;
                    return (
                        <Card key={item.id} elevation={3} sx={{ flex: 1, minWidth: 0 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0.5}}>
                            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 0.8 }}>
                                {item.name}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {item.symbol}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600, color: isPositive ? 'success.main' : 'error.main' }}>
                                {isPositive ? '+' : ''}{item.changePct.toFixed(2)}%
                            </Typography>
                        </CardContent>
                    </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}