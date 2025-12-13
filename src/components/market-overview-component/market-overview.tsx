import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import StaticChartComponent from "../static-chart-component/static-chart-component";
import type { MarketIndex } from "../types/types";


type MarketOverviewProps = {
    items: MarketIndex[];
};

export default function MarketOverviewComponent({ items }: MarketOverviewProps) {
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
                            <CardContent sx={{ display: 'flex', alignItems: 'stretch',  gap: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0, flex: '0 0 auto', maxWidth: 220 }}>
                                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 500, letterSpacing: 0.3 }}>
                                        {item.symbol}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        ${item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: isPositive ? 'success.main' : 'error.main' }}>
                                        {isPositive ? '+' : ''}{item.changePct.toFixed(2)}%
                                    </Typography>
                                </Box>

                                <Box sx={{ flex: '1 1 0%', minWidth: 0, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                    <StaticChartComponent changePct={item.changePct} height={80} id={item.id} />
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}