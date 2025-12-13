import { Box, Chip, Tooltip, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

type PremiumRatingProps = {
    value?: string;
    locked?: boolean;
    label?: string;      // "Premium"
    title?: string;      // "Our Rating"
    minWidth?: number;
};

const getRatingColor = (grade?: string) => {
  if (!grade) return "text.disabled";

  const normalized = grade.toUpperCase();

  if (normalized.startsWith("A")) return "success.main";   // A+, A, A-
  if (normalized.startsWith("B")) return "primary.main";   // B+, B
  if (normalized.startsWith("C")) return "warning.main";   // C+, C
  if (normalized.startsWith("D")) return "error.main";     // D
  if (normalized === "F") return "error.dark";

  return "text.disabled";
}

export default function PremiumRating({
    value = "A-",
    locked,
    label = "Premium",
    title = "Our Rating",
    minWidth = 140,
}: PremiumRatingProps) {

    const ratingColor = getRatingColor(value);

    return (
        <Box
            sx={{
                minWidth,
                pl: 2,
                borderLeft: "1px solid",
                borderColor: "divider",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(0,0,0,0.015)",
            }}
        >
            {/* Hover Group */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, "&:hover .rating-label": { color: "primary.main" } }}>
                {/* Label */}
                <Typography
                    variant="caption"
                    className="rating-label"
                    sx={{
                        color: "text.secondary",
                        fontWeight: 700,
                        letterSpacing: 0.3,
                        textTransform: "uppercase",
                        textAlign: "center",
                    }}
                >
                    {title}
                </Typography>

                {/* Content */}
                {locked ? (
                    <Tooltip title="Upgrade to Premium to view our rating">
                        <Chip
                            icon={<LockRoundedIcon sx={{ fontSize: 16 }} />}
                            label={label}
                            size="small"
                            sx={{
                                fontWeight: 700,
                                bgcolor: "rgba(0,0,0,0.06)",
                                borderRadius: 999,
                                px: 0.75,
                                cursor: "pointer",
                                "& .MuiChip-icon": { ml: 0.5 },
                            }}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip title="Our proprietary market rating">
                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                borderRadius: "50%",
                                border: "2px solid",
                                borderColor: ratingColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "border-color 120ms ease, transform 120ms ease",
                                cursor: "default",

                                "&:hover": {
                                    borderColor: ratingColor,
                                    transform: "scale(1.04)",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 900,
                                    fontSize: 26,
                                    color: ratingColor,
                                    lineHeight: 1,
                                    letterSpacing: 0.5,
                                }}
                            >
                                {value}
                            </Typography>
                        </Box>
                    </Tooltip>
                )}
            </Box>
        </Box>
    );
}
