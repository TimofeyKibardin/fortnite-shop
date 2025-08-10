import { getShop, ShopResponse } from "../../api/shop";
import { Box, Container, Typography } from "@mui/material";
import { JSX, useState, useEffect } from "react";
import GoodsGrid from "../../widgets/goods-grid/GoodsGrid";

export default function HomePage(): JSX.Element {
    const [data, setData] = useState<ShopResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShop('ru')
            .then((res) => {
                setData(res);
                setError(null);
            })
            .catch((e: Error) => {
                setError(e.message);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, []);

    console.log(data);

    return (
        // Container — центрирует контент и ограничивает ширину по сетке MUI.
        // sx={{ py: 4 }} — вертикальные отступы (padding‑y).
        <Container sx={{ py: 4 }}>
            {loading && <Typography>Загрузка...</Typography>}
            {error && <Typography color="error">Ошибка: {error}</Typography>}
            {data && (
                <Box sx={{ mb: 2, mt: 2 }}>
                    <GoodsGrid goods={data.shop} />
                </Box>
            )}
        </Container>
    );
}