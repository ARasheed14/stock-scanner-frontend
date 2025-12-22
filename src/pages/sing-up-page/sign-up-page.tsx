import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

import { Box, Paper, Stack, Typography, TextField, Button, Alert, Link } from "@mui/material";

export default function SignUpPage() {
    const { signUp } = useAuth();
    const nav = useNavigate();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setBusy(true);

        try {
            await signUp(email, password, displayName || undefined);
            nav("/search", { replace: true });
        } catch (e: any) {
            setErr(e?.message ?? "Failed to sign up");
        } finally {
            setBusy(false);
        }
    }

    return (
        <Box sx={{ p: 3, maxWidth: 420, mx: "auto" }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Create an account
                </Typography>
            </Paper>

            <Box component="form" onSubmit={onSubmit} noValidate>
                <Stack spacing={1.5}>
                    <TextField
                        label="Display name (optional)"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoComplete="name"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        type="password"
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        disabled={busy || !email || !password}
                        sx={{ textTransform: "none", fontWeight: 600, py: 1.1 }}
                    >
                        {busy ? "Creating..." : "Sign up"}
                    </Button>

                    {err && (
                        <Alert severity="error" sx={{ mt: 0.5 }}>
                            {err}
                        </Alert>
                    )}
                </Stack>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link component={RouterLink} to="/signin" underline="hover">
                    Sign in
                </Link>
            </Typography>
        </Box>
    );

}