import { AppBar, Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate, type NavigateFunction } from "react-router-dom";

type SignedOutHeaderProps = {
  navigate: NavigateFunction;
}

type SignedInHeaderProps = {
  email?: string | null;
  navigate: NavigateFunction;
  onSignOut: () => void;
  signingOut: boolean;
}

const SignedOutHeader: React.FC<SignedOutHeaderProps> = ({ navigate }) => (
  <Toolbar>
    <Typography variant="h6" sx={{ fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/")}>
      Stock Screener
    </Typography>
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => navigate("/signin")}>Sign In</Button>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.7)" }} />
      <Button color="inherit" sx={{ textTransform: "none" }} onClick={() => navigate("/signup")}>Sign Up</Button>
    </Box>
  </Toolbar>
);

const SignedInHeader: React.FC<SignedInHeaderProps> = ({ email, navigate, onSignOut, signingOut }) => (
  <Toolbar>
    <Typography variant="h6" sx={{ fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/")}>
      Stock Screener
    </Typography>
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography sx={{ lineHeight: 1 }}>{email}</Typography>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.7)" }} />
      <Button color="inherit" sx={{ textTransform: "none" }} onClick={onSignOut} disabled={signingOut}>Sign Out</Button>
    </Box>
  </Toolbar>
);

export default function HeaderComponent() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut?.();
    navigate("/signin");
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="primary">
      {user ? (
        <SignedInHeader email={user.email} navigate={navigate} onSignOut={handleSignOut} signingOut={false} />
      ) : (
        <SignedOutHeader navigate={navigate} />
      )}
    </AppBar>
  );
}