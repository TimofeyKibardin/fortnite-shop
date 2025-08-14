import { Box, Button, Card, CardContent, CardMedia, Chip, Tooltip, Typography } from "@mui/material";
import { RemoveShoppingCart } from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { ShopItems } from "../../../api/shop";
import { useCart } from "../../../shared/context/CartContext";
import { getRarity } from '../../../shared/constants/rarity';

import placeholder from '../../../shared/assets/images/card-placeholder.jpg'


export default function GoodCard(props: ShopItems) {
    const { addToCart, removeFromCart, isInCart } = useCart();

    const rarity = getRarity(props.rarity?.name || '');

    const inCart = isInCart(props.combinedId);
    const imageSrc = props.displayAssets?.[0]?.full_background || placeholder;

    const handleToggleButton = () => {
        inCart
            ? removeFromCart(props.combinedId)
            : addToCart(props);
    }

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
                    {props.price?.finalPrice && (
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
}