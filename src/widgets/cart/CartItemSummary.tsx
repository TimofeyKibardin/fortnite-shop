import { Box, Grid, Typography } from "@mui/material";
import { JSX } from "react";

import { cartStore } from "../..";
import { CartItem } from "../../shared/types/CartItem";
import CartItemCard from "../../entities/cart-item/ui/CartItemCard";
import { observer } from "mobx-react-lite";

export default observer(function CartItemSummary(): JSX.Element {
    const cartItems: CartItem[] = cartStore.cart;

    return (
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
            }}
        >
            {(!cartItems || cartItems.length === 0) && (
                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Cart is empty
                </Typography>
            )}
            {cartItems.length > 0 && (
                <Grid container spacing={0.5} direction="column">
                    {cartItems.map((item) => {
                        return (
                            <Grid key={item.combinedId}>
                                <CartItemCard cartItem={item} />
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </Box>
    );
});