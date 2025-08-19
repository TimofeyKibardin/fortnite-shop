import { useCallback } from "react";
import { Box, Button, Card, CardContent, CardMedia, Chip, Tooltip, Typography } from "@mui/material";
import { RemoveShoppingCart } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { cartStore } from "../../..";

import { ShopItems } from "../../../api/shop";
import { getRarityByID } from '../../../shared/constants/rarity';
import placeholder from '../../../shared/assets/images/card-placeholder.jpg'


export default observer(function GoodCard(props: ShopItems) {
    const rarity = getRarityByID(props.rarity?.id || props.rarity?.name || "");

    const inCart = cartStore.isInCart(props.combinedId);
    const imageSrc = props.displayAssets?.[0]?.full_background || placeholder;

    const handleToggleButton = useCallback(() => {
        cartStore.toggle(props);
    }, [props]);

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = placeholder;
    }, []);

    return (
        <Box sx={{ minWidth: 250 }}>
            <Card
                variant="outlined"
                sx={{
                    width: 250,
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid',
                    borderColor: rarity?.colors.Color1
                }}
            >
                <CardMedia
                    component="img"
                    image={imageSrc}
                    alt={props.displayName}
                    onError={handleImageError}
                    sx={{ height: 'fit-content', objectFit: 'cover' }}
                />
                <CardContent>
                    {props.rarity && props.rarity.name && (
                        <Chip
                            label={props.rarity.name}
                            size="small"
                            sx={{
                                backgroundColor: rarity?.colors.Color1 || '#ccc',
                                color: '#fff',
                                fontWeight: 'bold',
                                mb: 1
                            }}
                        />
                    )}
                    <Tooltip title={props.displayName}>
                        <Typography variant="h6" component="div" noWrap>
                            {props.displayName}
                        </Typography>
                    </Tooltip>
                        {typeof props.price?.finalPrice === "number" && (
                            <Typography variant="subtitle1" component="div" noWrap>
                            Price: {props.price.finalPrice}
                            </Typography>
                        )}
                    <Button
                        variant={inCart ? "outlined" : "contained"}
                        color="secondary"
                        size="small"
                        startIcon={inCart ? <RemoveShoppingCart /> : <AddShoppingCartIcon />}
                        onClick={handleToggleButton}
                        sx={{ mt: '5px' }}
                    >
                        {inCart ? 'Remove' : 'Add'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
});