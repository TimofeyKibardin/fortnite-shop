import React from "react";
import { getItemsList, getShop, ShopResponse } from "../../api/shop";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { JSX, useState, useEffect, useCallback, useMemo } from "react";

import GoodsGrid from "../../widgets/goods-grid/GoodsGrid";
import GoodsFilters from "../../widgets/goods-grid/GoodsFilters";
import { PriceFilterValues } from "../../shared/types/PriceFilterValues";


function getMinFinalPrice(data: ShopResponse): number {
    const prices = data.shop
        .filter(item => item.price?.finalPrice !== undefined)
        .map(item => item.price!.finalPrice);

    return prices.length > 0 ? Math.min(...prices) : 0;
}

function getMaxFinalPrice(data: ShopResponse): number {
    const prices = data.shop
        .filter(item => item.price?.finalPrice !== undefined)
        .map(item => item.price!.finalPrice);

    return prices.length > 0 ? Math.max(...prices) : 0;
}

export default function HomePage(): JSX.Element {
    const [data, setData] = useState<ShopResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination and PageSize filter
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(() => {
        const stored = localStorage.getItem('pageSize');
        if (stored) {
            const sizeFromStorage = Number(stored);
            return isNaN(sizeFromStorage) ? 12 : sizeFromStorage;
        }
        return 12;
    });

    // Rarity filter
    const [itemRarity, setItemRarity] = useState<string>(() => {
        const stored = localStorage.getItem('itemRarity');
        if (stored) {
            return (!stored || stored === '') ? '' : stored
        }
        return '';
    });

    // Price slider filter
    const [minPriceSlider, setMinPriceSlider] = useState<number>(0);
    const [maxPriceSlider, setMaxPriceSlider] = useState<number>(5000);
    const [priceValues, setPriceValues] = useState<PriceFilterValues>({
        priceMinValue: 0,
        priceMaxValue: 5000
    });

    // Data fetch
    const load = useCallback(() => {
        setLoading(true);
        setError(null);
        getShop('en')
        // getItemsList('en')
            .then((res) => {
                setData(res);
                setError(null);

                const min = getMinFinalPrice(res);
                const max = getMaxFinalPrice(res);
                setMinPriceSlider(min);
                setMaxPriceSlider(max);

                setPriceValues(() => {
                    const stored = localStorage.getItem('priceFilterValues');

                    if (stored) {
                        try {
                            const parsed = JSON.parse(stored) as PriceFilterValues;

                            return {
                                priceMinValue: Math.max(minPriceSlider, parsed.priceMinValue),
                                priceMaxValue: Math.min(maxPriceSlider, parsed.priceMaxValue),
                            };
                        } catch {
                            localStorage.removeItem('priceFilterValues');
                        }
                    }

                    return {
                        priceMinValue: minPriceSlider,
                        priceMaxValue: maxPriceSlider,
                    };
                })
            })
            .catch((e: Error) => {
                setError(e.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        return items.filter((item) => {
        const rarityMatches =
            !itemRarity ||
            item.rarity?.name?.toLowerCase() === itemRarity.toLowerCase();

        const price = item.price?.finalPrice ?? 0;
        const priceMatches =
            price >= priceValues.priceMinValue &&
            price <= priceValues.priceMaxValue;

        return rarityMatches && priceMatches;
    });
    }, [items, itemRarity, priceValues]);

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

    // Save itemPrice in localStorage
    useEffect(() => {
        localStorage.setItem('priceFilterValues', JSON.stringify(priceValues));
    }, [priceValues]);

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
                        priceBorders={[minPriceSlider, maxPriceSlider]}
                        priceValues={priceValues}
                        setPriceValues={setPriceValues}
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