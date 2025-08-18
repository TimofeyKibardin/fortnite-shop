import { PriceFilterValues } from '../types/PriceFilterValues';
import { Stack, Typography, Slider } from '@mui/material';

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
        <Stack spacing={1} sx={{ minWidth: 250 }}>
            <Typography id={labelId} variant="body2" fontWeight="bold">
                {label}
            </Typography>
            <Slider
                value={[values.priceMinValue, values.priceMaxValue]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={priceBorders[0]}
                max={priceBorders[1]}
                color='secondary'
                // sx={{
                //     color: '#9c27b0', // secondary color
                //     '& .MuiSlider-thumb': {
                //         borderRadius: '4px',
                //     },
                // }}
            />
        </Stack>
    );
}