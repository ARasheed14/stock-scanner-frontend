import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import PremiumRatingComponent from "../premium-rating-component/premium-rating-component";
import type { NewsItem, Sentiment } from "../types/types";

type NewsSectionProps = {
    items: NewsItem[];
};

// Once profile creation is implemented this will be controlled by user subscription status
const PREMIUM_RATING_LOCKED = false;

function sentimentColor(sentiment?: Sentiment) {
    if (sentiment === 'positive') return 'success';
    if (sentiment === 'negative') return 'error';
    return 'default';
}

export default function NewsSectionComponent({ items }: NewsSectionProps) {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                Latest Market News
            </Typography>
            <Stack spacing={2}>
                {items.map((news) => (
                    <Card key={news.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 2 }}>
                        <CardContent sx={{ p: 0, flex: 1, minWidth: 0 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {news.headline}
                            </Typography>
                            {news.summary && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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
                        <PremiumRatingComponent value={news.Rating ?? "--"} locked={PREMIUM_RATING_LOCKED} />
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}