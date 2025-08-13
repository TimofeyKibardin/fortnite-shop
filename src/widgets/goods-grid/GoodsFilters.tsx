import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface GoodsFiltersProps {
    total: number;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
}

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
                    Найдено товаров: <b>{total}</b>
                </Typography>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel
                        id="page-size-label"
                        sx={{
                            color: 'black',
                            '&.Mui-focused': {
                                color: 'black'
                            },
                        }}
                    >
                        На странице 
                    </InputLabel>
                    <Select
                        labelId="page-size-label"
                        value={pageSize}
                        label="На странице"
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        sx={{
                            color: 'black',
                            '& .MuiSelect-select': {
                                fontWeight: 400,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#9c27b0',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#9c27b0',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#9c27b0',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#9c27b0',
                            },
                        }}
                    >
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={48}>48</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    );
}