import { Link as RouterLink  } from 'react-router-dom';
import { JSX } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartItemSummary from '../../widgets/cart/CartItemSummary';

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
            {/* Back */}
            <Button
                component={RouterLink}
                to="/"
                startIcon={<ArrowBackIcon />}
                variant='contained'
                color="secondary"
                sx={{
                    alignSelf: "flex-start",
                    mb: 2,
                    textTransform: "none",
                    fontWeight: 400,
                    width: '160px'
                }}
            >
                Back to catalog
            </Button>
            
            {/* Title */}
            <Typography variant="h4" fontWeight={600}>Cart</Typography>

            {/* Cart grid */}
            <Box sx={{ mb: 8, mt: 2 }}>
                <CartItemSummary />
            </Box>
        </Container>
    );
}