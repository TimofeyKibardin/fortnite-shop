import { Box, BoxProps } from '@mui/material';

export default function PanelContainer({ children, sx, ...rest }: BoxProps) {
    return (
        <Box
            sx={{
                mb: 3,
                px: 2,
                py: 2,
                backgroundColor: (theme) => theme.palette.grey[100],
                borderRadius: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
                width: 'fit-content',
                maxWidth: '100%',
                ...sx,
            }}
                {...rest} // Остальные параметры
            >
                {/* Вложенные параметры */}
                {children}
        </Box>
    );
}