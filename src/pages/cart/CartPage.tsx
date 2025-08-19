import { Container, Typography } from "@mui/material";
import { JSX } from "react";

export default function CartPage(): JSX.Element {
    return (
        <Container
            sx={{
                py: 4,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography>Cart Page</Typography>
        </Container>
    );
}