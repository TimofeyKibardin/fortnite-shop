import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ShopItems } from "../../../api/shop";

export default function GoodCard(item: ShopItems) {
    const cardContent = (
        <React.Fragment>
            {item.displayAssets && item.displayAssets[0] && (
                <CardMedia
                    component="img"
                    image={item.displayAssets[0].full_background}
                    // alt={item.full_background}
                    sx={{ height: 'fit-content', objectFit: 'cover' }}
                />
            )}
            <CardContent>
                <Typography 
                    variant="h6"
                    component="div"
                    noWrap
                >
                    {item.displayName}
                </Typography>
                {item.price && item.price.finalPrice &&
                    <Typography 
                        variant="subtitle1"
                        component="div"
                        noWrap
                    >
                        Price: {item.price.finalPrice}
                    </Typography>
                }
            </CardContent>
        </React.Fragment>
    );


    return (
        <Box sx={{ minWidth: 250 }}>
            <Card
                variant="outlined"
                sx={{ width: 250, height: 400, display: 'flex', flexDirection: 'column' }}
            >
                {cardContent}
            </Card>
        </Box>
    );
}