import { getItemsList, getShop, ShopResponse } from "../../api/shop";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { JSX, useState, useEffect, useCallback, useMemo } from "react";
import GoodsGrid from "../../widgets/goods-grid/GoodsGrid";
import React from "react";
import GoodsFilters from "../../widgets/goods-grid/GoodsFilters";

export default function HomePage(): JSX.Element {
    const [data, setData] = useState<ShopResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Pagination and PageSize filter
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(() => {
        const stored = localStorage.getItem('pageSize');
        if (stored) {
            const sizeFromStorage = Number(stored);
            return isNaN(sizeFromStorage) ? 12 : sizeFromStorage;
        }
        return 12;
    });
    // Rarity filter
    const [itemRarity, setItemRarity] = useState(() => {
        const stored = localStorage.getItem('itemRarity');
        if (stored) {
            return (!stored || stored === '') ? '' : stored
        }
        return '';
    })

    // Data fetch
    const load = useCallback(() => {
        setLoading(true);
        setError(null);
        getShop('en')
        // getItemsList('en')
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

    // Fetch data on first render
    useEffect(() => { load(); }, [load]);

    // Memorized api data
    const items = useMemo(() => {
        return data?.shop
            ?.filter((s) => s.mainId && s.displayName)
            .map((s) => ({
                ...s,
                combinedId: `${s.displayName}-${s.mainId}`,
                inCart: false
            })) ?? [];
    }, [data]);

    // Items filtering by rarity
    const filteredItems = useMemo(() => {
        if (!itemRarity) return items; // return everything if filter is null
        return items.filter((s) => s.rarity?.name?.toLowerCase() === itemRarity.toLowerCase());
    }, [items, itemRarity]);

    // Memorized page data
    const { totalPages, pageItems } = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
        const safePage = Math.min(page, totalPages);
        const start = (safePage - 1) * pageSize;
        const pageItems = filteredItems.slice(start, start + pageSize);
        return { totalPages, pageItems };
    }, [filteredItems, page, pageSize]);

    // Items count or page size has changed
    useEffect(() => {
        setPage(1);
    }, [filteredItems.length, pageSize, itemRarity]);

    // Save pageSize in localStorage
    useEffect(() => {
        localStorage.setItem('pageSize', pageSize.toString());
    }, [pageSize]);

    // Save itemRarity in localStorage
    useEffect(() => {
        localStorage.setItem('itemRarity', itemRarity);
    }, [itemRarity]);

    // Change page handler
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <Container sx={{ py: 4 }}>
            {loading && <Typography>Загрузка...</Typography>}
            {error && <Typography color="error">Ошибка: {error}</Typography>}
            {!loading && !error && (
                <>
                    {/* Filters */}
                    <GoodsFilters
                        total={filteredItems.length}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        itemRarity={itemRarity}
                        setItemRarity={setItemRarity}
                    />

                    {/* Grid */}
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <GoodsGrid goods={pageItems} rarityFilter={itemRarity} />
                    </Box>

                    {/* Pagination */}
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