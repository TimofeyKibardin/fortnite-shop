import { getShop, ShopResponse } from "../../api/shop";
import { Box, Container, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import { JSX, useState, useEffect, useCallback, useMemo } from "react";
import GoodsGrid from "../../widgets/goods-grid/GoodsGrid";
import React from "react";
import PanelContainer from "../../shared/ui/PanelContainer";

export default function HomePage(): JSX.Element {
    const [data, setData] = useState<ShopResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Пагинация
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(() => {
        const stored = localStorage.getItem('pageSize');
        if (stored) {
            const sizeFromStorage = Number(stored);
            return isNaN(sizeFromStorage) ? 12 : sizeFromStorage;
        }
        return 12;
    });

    // Загрузка данных
    const load = useCallback(() => {
        setLoading(true);
        setError(null);
        getShop('en')
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

    // Загрузка данных при первом рендере
    useEffect(() => { load(); }, [load]);

    // Сбор единого массива товаров из ответа
    const items = useMemo(() => {
        return data?.shop
            ?.filter((s) => s.mainId && s.displayName)
            .map((s) => ({
                ...s,
                combinedId: `${s.displayName}-${s.mainId}`,
                inCart: false
            })) ?? [];
    }, [data]);

    // Считаем страницы и текущий срез
    const { totalPages, pageItems } = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        const safePage = Math.min(page, totalPages); // если уменьшили pageSize
        const start = (safePage - 1) * pageSize;
        const pageItems = items.slice(start, start + pageSize);
        return { totalPages, pageItems };
    }, [items, page, pageSize]);

    // Если поменялось количество товаров или размер страницы — сбрасываем на 1ю страницу
    useEffect(() => {
        setPage(1);
    }, [items.length, pageSize]);

    // Сохранение выбранного кол-ва карточек на странице
    useEffect(() => {
        localStorage.setItem('pageSize', pageSize.toString());
    }, [pageSize]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        // Container — центрирует контент и ограничивает ширину по сетке MUI.
        // sx={{ py: 4 }} — вертикальные отступы (padding‑y).
        <Container sx={{ py: 4 }}>
            {loading && <Typography>Загрузка...</Typography>}
            {error && <Typography color="error">Ошибка: {error}</Typography>}
            {!loading && !error && (
                <>
                    {/* Панель управления пагинацией */}
                    <PanelContainer>
                        <Typography variant="body2">
                            Найдено товаров: <b>{items.length}</b>
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                <InputLabel id="page-size-label">На странице</InputLabel>
                                <Select
                                    labelId="page-size-label"
                                    value={pageSize}
                                    label="На странице"
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                >
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={24}>24</MenuItem>
                                    <MenuItem value={48}>48</MenuItem>
                                </Select>
                            </FormControl>

                            {/* <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="secondary"
                                siblingCount={1}
                                boundaryCount={1}
                            /> */}
                        </Stack>
                    </PanelContainer>


                    <Box sx={{ mb: 2, mt: 2 }}>
                        <GoodsGrid goods={pageItems} />
                    </Box>

                    {/* Пагинация ещё раз снизу */}
                    {items.length > pageSize && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="secondary"
                                siblingCount={1}
                                boundaryCount={1}
                            />
                        </Box>
                    )}
                </>
                
            )}
        </Container>
    );
}