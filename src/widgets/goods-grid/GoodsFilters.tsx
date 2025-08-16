import { Box, Stack, Typography } from "@mui/material";

import SelectFilter from "../../shared/ui/SelectFilter";
import { Dispatch, SetStateAction } from "react";
import { getAllPageSizes } from "../../shared/constants/pagesize";
import { getAllRarities } from "../../shared/constants/rarity";

interface GoodsFiltersProps {
    total: number;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    itemRarity: string;
    setItemRarity: Dispatch<SetStateAction<string>>;
}

// PageSizeFilter
const pageSizeNumbers: number[] = getAllPageSizes();
// Rarity
const rarities: string[] = ['All', ...getAllRarities().map((r) => {
    return `${r.name[0].toUpperCase()}${r.name.slice(1).toLowerCase()}`
})];

export default function GoodsFilters({
    total,
    pageSize,
    setPageSize,
    itemRarity,
    setItemRarity
}: GoodsFiltersProps) {
    return (
        <Box
            sx={{
                maxWidth: 900,
                width: "100%",
                mx: "auto",
                mb: 2,
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2">
                    Items found: <b>{total}</b>
                </Typography>

                <SelectFilter
                    labelId={"page-size-label"}
                    value={pageSize}
                    label={"Page size"}
                    onChange={(value) => setPageSize(Number(value))}
                    collection={pageSizeNumbers}
                />

                <SelectFilter
                    labelId={"item-rarity-label"}
                    value={itemRarity}
                    label={"Item rarity"}
                    onChange={(value) => setItemRarity(value === "All" ? "" : String(value))}
                    collection={rarities}
                />
            </Stack>
        </Box>
    );
}