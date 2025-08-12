import React from "react";
import { Box, Card, CardContent, CardMedia, Chip, Tooltip, Typography } from "@mui/material";
import { ShopItems } from "../../../api/shop";
import placeholder from '../../../shared/assets/images/card-placeholder.jpg'

const rarityColors: Record<string, string> = {
    common: '#a0a0a0',
    uncommon: '#3cb043',
    rare: '#3399ff',
    epic: '#b43cff',
    legendary: '#ff9933',
    mythic: '#e6007e',
};

export default function GoodCard(item: ShopItems) {
    const rarityName = item.rarity?.name?.toLowerCase() ?? 'common';
    const borderColor = rarityColors[rarityName] || '#cccccc';

    const cardContent = (
        <React.Fragment>
            {item.displayAssets && item.displayAssets[0] && (
                <CardMedia
                    component="img"
                    image={item.displayAssets?.[0]?.full_background || placeholder}
                    alt={item.displayName}
                    sx={{ height: 'fit-content', objectFit: 'cover' }}
                />
            )}
            <CardContent>
                <Tooltip title={item.displayName}>
                    <Typography 
                        variant="h6"
                        component="div"
                        noWrap
                    >
                        {item.displayName}
                    </Typography>
                </Tooltip>
                {item.price && item.price.finalPrice &&
                    <Typography 
                        variant="subtitle1"
                        component="div"
                        noWrap
                    >
                        Price: {item.price.finalPrice}
                    </Typography>
                }
                {item.rarity && item.rarity.name &&
                    <Chip
                        label={item.rarity.name}
                        size="small"
                        sx={{
                            backgroundColor: rarityColors[rarityName] || '#ccc',
                            color: '#fff',
                            fontWeight: 'bold',
                            mt: 1
                        }}
                    />
                }
            </CardContent>
        </React.Fragment>
    );


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
                    borderColor
                }}
            >

                {item.displayName && cardContent}
            </Card>
        </Box>
    );
}