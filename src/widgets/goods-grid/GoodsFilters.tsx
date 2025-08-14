import { Box, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import SelectFilter from "../../shared/ui/SelectFilter";

interface GoodsFiltersProps {
    total: number;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
}

// PageSizeFilter
const pageSizeNumbers = [8, 12, 24, 48];

export default function GoodsFilters({ total, pageSize, setPageSize }: GoodsFiltersProps) {
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
            </Stack>
        </Box>
    );
}