import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectFilterProps {
    labelId: string;
    value: string | number;
    label: string;
    onChange: (value: string | number | boolean) => void;
    collection: string[] | number[] | boolean[];
}

export default function SelectFilter({
    labelId,
    value,
    label,
    onChange,
    collection
}: SelectFilterProps) {
    return (
        <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                value={value}
                label={label}
                onChange={(event) => {
                    const rawValue = event.target.value;
                    if (typeof value === "number") {
                        onChange(Number(rawValue));
                    } else if (typeof value === "boolean") {
                        onChange(rawValue === "true");
                    } else {
                        onChange(rawValue);
                    }
                }}
                sx={{
                    color: 'black',
                    '& .MuiSelect-select': { fontWeight: 400 },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9c27b0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9c27b0' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9c27b0' },
                    '& .MuiSvgIcon-root': { color: '#9c27b0' },
                }}
            >
                {collection.map((colItem, idx) => (
                    <MenuItem key={idx} value={String(colItem)}>
                        {colItem.toString()}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}