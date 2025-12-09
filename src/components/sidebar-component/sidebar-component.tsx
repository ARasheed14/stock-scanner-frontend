import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, FormControl, FormControlLabel, Radio, RadioGroup, Toolbar, Typography } from "@mui/material";
import ExpandMoreIcons from '@mui/icons-material/ExpandMore';

const drawerWidth = 280;

type SideBarProps = {
    priceChangePct: "4" | "10" | null;
    onPriceChangePct: (value: "4" | "10" | null) => void;
};

export default function SideBar({ priceChangePct, onPriceChangePct }: SideBarProps) {
    return (
        <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #e0e0e0', borderColor: 'divider' } }} >

            <Toolbar />

            <Box sx={{ overflowY: 'auto', pt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Filters
                </Typography>

                {/* Sidebar content can be added here (Filters) */}
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcons />} aria-controls="price-filter-content" id="price-filter-header">
                        <Typography variant="subtitle2" fontWeight={600}>
                            Price Change %
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup value={priceChangePct ?? ''} 
                                onChange={(e) => 
                                    onPriceChangePct(e.target.value as "4" | "10")
                                }
                            >
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="Greater than 4%" />
                                <FormControlLabel value="10" control={<Radio size="small"/>} label="Greater than 10%" />
                            </RadioGroup>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Drawer>
    );
}