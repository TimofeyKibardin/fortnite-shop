import React, { useRef } from "react";
import { getShop, ShopResponse } from "../../api/shop";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { JSX, useState, useEffect, useCallback, useMemo } from "react";

import GoodsGrid from "../../widgets/goods-grid/GoodsGrid";
import GoodsFilters from "../../widgets/goods-grid/GoodsFilters";
import { PriceFilterValues } from "../../shared/types/PriceFilterValues";

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);


export default function HomePage(): JSX.Element {
    const [data, setData] = useState<ShopResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination and PageSize filter
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(() => {
        const stored = localStorage.getItem('pageSize');
        const n = stored ? Number(stored) : NaN;
        return Number.isFinite(n) ? n : 12;
    });

    // Rarity filter
    const [itemRarity, setItemRarity] = useState<string>(() => {
        const stored = localStorage.getItem("itemRarity");
        return stored ?? "";
    });

    // Price slider filter
    const [priceValues, setPriceValues] = useState<PriceFilterValues | undefined>(undefined);

    // Price ref
    const priceRef = useRef(false);


    // Data fetch
    const load = useCallback(() => {
        setLoading(true);
        setError(null);
        getShop("en")
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

    // Price slider range memorized
    const priceDomain = useMemo<[number, number]>(() => {
        const nums = items
            .map((i) => i.price?.finalPrice)
            .filter((n): n is number => typeof n === "number" && Number.isFinite(n));

        if (nums.length === 0) return [0, 0];

        return [Math.min(...nums), Math.max(...nums)];
    }, [items]);

    // Changed price slider
    useEffect(() => {
        if (!data) return;
        const [min, max] = priceDomain;

        // If no data for min and max borders
        if (min === 0 && max === 0) {
            setPriceValues({ priceMinValue: 0, priceMaxValue: 0 });
            priceRef.current = true;
            return;
        }

        const stored = localStorage.getItem("priceFilterValues");
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as PriceFilterValues;
                setPriceValues({
                    priceMinValue: clamp(parsed.priceMinValue, min, max),
                    priceMaxValue: clamp(parsed.priceMaxValue, min, max),
                });
                priceRef.current = true;
                return;
            } catch {
                localStorage.removeItem("priceFilterValues");
            }
        }

        // No saved price values
        setPriceValues({ priceMinValue: min, priceMaxValue: max });
        priceRef.current = true;
    }, [data, priceDomain]);

    // Items apply filtering
    const filteredItems = useMemo(() => {
        const [domMin, domMax] = priceDomain;
        const pv = priceValues ?? { priceMinValue: domMin, priceMaxValue: domMax };

        return items.filter((item) => {
            // Rarity
            const rarityOk =
                !itemRarity ||
                item.rarity?.name?.toLowerCase() === itemRarity.toLowerCase();

            // Price
            const price = item.price?.finalPrice ?? Number.NEGATIVE_INFINITY;
            const priceOk = price >= pv.priceMinValue && price <= pv.priceMaxValue;

            return rarityOk && priceOk;
        });
    }, [items, itemRarity, priceValues, priceDomain]);

    // Memorized page data
    const { totalPages, pageItems } = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
        const safePage = Math.min(page, totalPages);
        const start = (safePage - 1) * pageSize;
        return { totalPages, pageItems: filteredItems.slice(start, start + pageSize) };
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
        if (!priceRef.current || !priceValues) return;
        localStorage.setItem('priceFilterValues', JSON.stringify(priceValues));
    }, [priceValues]);

    // Change page handler
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <Container
            sx={{
                py: 4,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error: {error}</Typography>}
            {!loading && !error && (
                <>
                    {/* Filters */}
                    {priceValues && (
                        <GoodsFilters
                            total={filteredItems.length}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            itemRarity={itemRarity}
                            setItemRarity={setItemRarity}
                            priceBorders={priceDomain}
                            priceValues={priceValues}
                            setPriceValues={setPriceValues}
                        />
                    )}

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