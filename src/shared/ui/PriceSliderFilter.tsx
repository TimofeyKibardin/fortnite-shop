import { PriceFilterValues } from '../types/PriceFilterValues';
import { Slider, FormLabel, FormControl, Box } from '@mui/material';

interface PriceFilterProps {
    labelId: string;
    label: string;
    values: PriceFilterValues;
    priceBorders: number[];
    onChange: (value: PriceFilterValues) => void;
}

export default function PriceSliderFilter({
    labelId,
    label,
    values,
    priceBorders,
    onChange
}: PriceFilterProps) {
    const handleChange = (_: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            const [min, max] = newValue;
            onChange({
                priceMinValue: min,
                priceMaxValue: max
            })
        }
    };

    return (
        <FormControl
            size="small"
            sx={{
                minWidth: 300,
                px: 1.5,
                pt: 1,
                border: "1px solid #9c27b0",
                borderRadius: "4px",
                position: "relative",
            }}
        >
            <FormLabel
                sx={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    backgroundColor: "white",
                    px: 0.5,
                    fontSize: "0.75rem",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 400,
                }}
            >
                {label}
            </FormLabel>

            <Box display="flex" alignItems="center" gap={2}>
                <Slider
                    value={[values.priceMinValue, values.priceMaxValue]}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={priceBorders[0]}
                    max={priceBorders[1]}
                    color="secondary"
                    sx={{
                        color: '#9c27b0',
                    }}
                />
            </Box>
        </FormControl>
    );
}