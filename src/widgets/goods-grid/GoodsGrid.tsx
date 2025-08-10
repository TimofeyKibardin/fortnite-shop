import { Grid, Typography } from "@mui/material";
import { ShopItems } from "../../api/shop";
import GoodCard from "../../entities/good/ui/GoodCard";

interface GoodsGridProps {
  goods: ShopItems[];
}

export default function GoodsGrid({ goods }: GoodsGridProps) {
    console.log(goods);
    if (!goods || goods.length === 0) {
        return <Typography>Нет товаров</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {goods.map((item) => (
                <Grid key={item.mainId}>
                    <GoodCard {...item} />
                </Grid>
            ))}
        </Grid>
    );
}