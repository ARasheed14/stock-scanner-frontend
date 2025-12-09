import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

type Sentiment = "positive" | "negative" | "neutral";

export type NewsItem = {
    id: string;
    headline: string;
    summary?: string;
    source: string;
    timeAgo: string;
    symbol?: string;
    sentiment?: Sentiment;
};

type NewsSectionProps = {
    items?: NewsItem[];
};

const mockNews: NewsItem[] = [
    { id: '1', headline: 'Market hits all-time high amid economic recovery', summary: 'The stock market reached a new peak today as economic indicators show signs of recovery.', source: 'Reuters', timeAgo: '2h ago', symbol: 'SPX', sentiment: 'positive' },
    { id: '2', headline: 'Tech stocks lead the way in today\'s trading session', summary: 'Technology companies saw significant gains, driving the market higher.', source: 'Bloomberg', timeAgo: '3h ago', symbol: 'AAPL', sentiment: 'positive' },
    { id: '3', headline: 'Concerns over inflation impact investor sentiment', summary: 'Rising inflation fears are causing some investors to be cautious.', source: 'CNBC', timeAgo: '5h ago', sentiment: 'negative' },
    { id: '4', headline: 'New regulations expected to affect financial sector', summary: 'Upcoming regulatory changes may impact banks and financial institutions.', source: 'WSJ', timeAgo: '1d ago', symbol: 'JPM', sentiment: 'neutral' },
];

function sentimentColor(sentiment?: Sentiment) {
    if (sentiment === 'positive') return 'success';
    if (sentiment === 'negative') return 'error';
    return 'default';
}

export default function NewsSectionComponent({ items = mockNews }: NewsSectionProps) {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                Latest Market News
            </Typography>
            <Stack spacing={2}>
                {items.map((news) => (
                    <Card key={news.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {news.headline}
                            </Typography>
                            {news.summary && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, lineHeight: 1.4 }}>
                                    {news.summary}
                                </Typography>
                            )}
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                                {news.symbol && (
                                    <Chip label={news.symbol} size="small" variant="outlined" />
                                )}

                                {news.sentiment && (
                                    <Chip label={news.sentiment} size="small" variant="outlined" color={sentimentColor(news.sentiment)} />
                                )}

                                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                    {news.source} • {news.timeAgo}
                                </Typography>

                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}