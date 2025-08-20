import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { JSX, useCallback } from "react";
import { CartItem } from "../../../shared/types/CartItem";

import placeholder from '../../../shared/assets/images/card-placeholder.jpg';
import { getRarityByID } from '../../../shared/constants/rarity';
import { RemoveShoppingCart } from "@mui/icons-material";

import { cartStore } from "../../..";

interface CartItemCardProps {
    cartItem: CartItem
}


export default function CartItemCard({
    cartItem
}: CartItemCardProps): JSX.Element {
    const rarity = getRarityByID(cartItem.rarity?.id || cartItem.rarity?.name || "");
    const imageSrc = cartItem.displayAssets?.[0]?.full_background || placeholder;
    const price = cartItem.price?.finalPrice ?? 0;

    const handleToggleButton = useCallback(() => {
        cartStore.removeFromCart(cartItem.combinedId);
    }, [cartItem]);

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = placeholder;
    }, []);

    return (
        <Card
            variant="outlined"
            sx={{
                overflow: "hidden",
                borderRadius: 2,
                display: "flex",
                p: { xs: 1.5, sm: 2 },
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                gap: { xs: 0, sm: 2 },
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    flexShrink: 0,
                    width: { xs: "100%", sm: 120, md: 140 },
                    height: { xs: 180, sm: 120, md: 140 },
                    borderRadius: 1.5,
                    overflow: "hidden",
                }}
            >
                <CardMedia
                    component="img"
                    image={imageSrc}
                    alt={cartItem.displayName}
                    onError={handleImageError}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>

            {/* Content */}
            <CardContent
                sx={{
                    p: 0,
                    "&:last-child": { p: 0 },
                    flex: "1 1 auto",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1,
                    height: "100%"
                }}
            >
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={1}
                >
                    {/* Title */}
                    <Tooltip title={cartItem.displayName}>
                        <Typography variant="h6" component="div" noWrap>
                            {cartItem.displayName}
                        </Typography>
                    </Tooltip>

                    {/* Rarity */}
                    {rarity?.name && (
                        <Chip
                            size="small"
                            label={rarity.name}
                            sx={{
                                backgroundColor: rarity?.colors.Color1 || '#ccc',
                                color: '#fff',
                                fontWeight: 'bold',
                                mb: 1
                            }}
                        />
                    )}

                    {/* Price */}
                    <Typography variant="subtitle1" component="div" noWrap>
                        Price: {price}
                    </Typography>
                    
                    {/* Remove from cart */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<RemoveShoppingCart />}
                        onClick={handleToggleButton}
                        sx={{ alignSelf: "flex-start", mt: 1, mb: 0 }}
                    >
                        Remove
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}