import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

import { Box, Typography, TextField, Button, Alert, Link } from "@mui/material";

export default function SignInPage() {
    const { signIn } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setBusy(true);
        try {
            await signIn(email, password);
            nav("/search", { replace: true });
        } catch (e: any) {
            setErr(e?.message ?? "Failed to sign in");
        } finally {
            setBusy(false);
        }
    }

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 420,
                mx: "auto",
            }}
        >
            <Typography variant="h5" fontWeight={600} gutterBottom>
                Sign in
            </Typography>

            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{ display: "grid", gap: 2 }}
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    fullWidth
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={busy || !email || !password}
                >
                    {busy ? "Signing in..." : "Sign in"}
                </Button>

                {err && <Alert severity="error">{err}</Alert>}
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
                No account?{" "}
                <Link component={RouterLink} to="/signup" underline="hover">
                    Create one
                </Link>
            </Typography>
        </Box>
    );
}
