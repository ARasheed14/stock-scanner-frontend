import { AppBar, Box, Button, Divider, Toolbar, Typography } from "@mui/material";

export default function HeaderComponent() {
    return (
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Stock Screener
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => console.log("Sign In Clicked")}>Sign In</Button>
            <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.7)" }} />
            <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => console.log("Sign Up Clicked")}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
}