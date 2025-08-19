import { Box, Grid, Typography } from "@mui/material";
import { ShopItems } from "../../api/shop";
import GoodCard from "../../entities/good/ui/GoodCard";

interface GoodsGridProps {
    goods: ShopItems[];
    rarityFilter: string;
}

export default function GoodsGrid({ goods, rarityFilter }: GoodsGridProps) {
    
    if (!goods || goods.length === 0) {
        return (
        <Box
            sx={{
                minHeight: "70vh", // empty list height
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h6" color="text.secondary">
                Not found
            </Typography>
        </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "70vh", // empty list height
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                {goods.map((item) => {
                    if (!item.mainId || !item.displayName) {
                        return null;
                    }
                    else if (
                        item.rarity && rarityFilter && rarityFilter !== ''
                        && item.rarity.name.toLowerCase() !== rarityFilter.toLowerCase()
                    ) {
                        return null;
                    }

                    return (
                        <Grid key={item.mainId}>
                            <GoodCard {...item} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>  
    );
}