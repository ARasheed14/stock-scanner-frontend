import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Drawer, FormControl, FormControlLabel, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import ExpandMoreIcons from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const drawerWidth = 280;

type SideBarProps = {
    priceChangePct: "4" | "10" | null;
    onPriceChangePct: (value: "4" | "10" | null) => void;
};

const initialSavedFilters = [
    { id: "volume", name: "Volume" },
    { id: "exchange", name: "Exchange" },
    { id: "gainers", name: "Price 10%+" },
];

type SavedFilter = {
    id: string;
    name: string;
}

export default function SideBar({ priceChangePct, onPriceChangePct }: SideBarProps) {

    const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(initialSavedFilters);

    const onDeleteFilter = (id: string) => {
        console.log("Delete Filter Clicked:", id);
        setSavedFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id));
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: "1px solid",
                    borderColor: "divider",
                },
            }}
        >
            <Toolbar />

            <Box sx={{ p: 0, overflowY: "auto" }}>

                <Box sx={{ px: 2, pt: 2 }}>
                    {/* Saved Filters */}
                    <Typography
                        variant="subtitle2"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            fontSize: 11,
                        }}
                        color="text.secondary"
                    >
                        Saved Filters
                    </Typography>

                    <List dense sx={{ mb: 1 }}>
                        {savedFilters.map((filter) => (
                            <ListItem
                                key={filter.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" size="small" onClick={() => onDeleteFilter(filter.id)} sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}>
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                }
                                disablePadding
                                sx={{ mb: 0.5, borderRadius: 1 }}
                            >
                                <ListItemButton
                                    key={filter.id}
                                    sx={{ borderRadius: 1, mb: 0.5 }}
                                    onClick={() => console.log("Clicked Saved Filter:", filter.id)}
                                >
                                    <ListItemText
                                        primary={filter.name}
                                        primaryTypographyProps={{ fontSize: 13 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mb: 2, textTransform: "none" }}
                        onClick={() => console.log("Add New Filter Clicked")}
                    >
                        + Add New Filter
                    </Button>

                    <Divider sx={{ my: 2 }} />

                    {/* Filters Section */}
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                        Filters
                    </Typography>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcons />}
                            aria-controls="price-filter-content"
                            id="price-filter-header"
                        >
                            <Typography variant="subtitle2" fontWeight={600}>
                                Price Change %
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <FormControl component="fieldset" fullWidth>
                                <RadioGroup
                                    value={priceChangePct ?? ""}
                                    onChange={(e) =>
                                        onPriceChangePct(e.target.value as "4" | "10")
                                    }
                                >
                                    <FormControlLabel
                                        value="4"
                                        control={<Radio size="small" />}
                                        label="Greater than 4%"
                                    />
                                    <FormControlLabel
                                        value="10"
                                        control={<Radio size="small" />}
                                        label="Greater than 10%"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Drawer>

    );
}