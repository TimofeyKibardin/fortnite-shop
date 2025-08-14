import { Box, Grid, Typography } from "@mui/material";
import { ShopItems } from "../../api/shop";
import GoodCard from "../../entities/good/ui/GoodCard";

interface GoodsGridProps {
  goods: ShopItems[];
}

export default function GoodsGrid({ goods }: GoodsGridProps) {
    /* Получение типов */
    // function getUniqueTypes(goods: ShopItems[], type: string) {
    //     const values = new Set();
    //     for (const item of goods) {
    //         const typeItem = item.mainType
    //         if (typeof typeItem === type) {
    //             values.add(typeItem);
    //         }
    //     }
    //     return Array.from(values);
    // }
    // console.log(getUniqueTypes(goods, 'string'));
    /* Получение типов */

    console.log(goods);
    if (!goods || goods.length === 0) {
        return (
        <Box
            sx={{
                minHeight: "70vh", // высота для центрирования при пустом списке
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h6" color="text.secondary">
                Нет товаров
            </Typography>
        </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "70vh", // центрируем по высоте
                display: "flex",
                alignItems: "center", // по вертикали
                justifyContent: "center", // по горизонтали
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                {goods.map((item) => {
                    if (!item.mainId || !item.displayName) return null;
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