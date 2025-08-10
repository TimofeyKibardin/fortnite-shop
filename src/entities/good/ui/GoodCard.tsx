import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ShopItems } from "../../../api/shop";

export default function GoodCard(item: ShopItems) {
    const cardContent = (
        <React.Fragment>
            {item.full_background && (
                <CardMedia
                    component="img"
                    image={item.full_background[0].full_background}
                    // alt={item.full_background}
                    sx={{ height: 180, objectFit: 'cover' }}
                />
            )}
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.displayName}
                </Typography>
            </CardContent>
        </React.Fragment>
    );


    return (
        <Box sx={{ minWidth: 250 }}>
            <Card
                variant="outlined"
                sx={{ width: 250, height: 300, display: 'flex', flexDirection: 'column' }}
            >
                {cardContent}
            </Card>
        </Box>
    );
}