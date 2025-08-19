import { Link as RouterLink, useLocation  } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, InputBase } from '@mui/material';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useState } from 'react';

interface HeaderProps {
    setItemTitle: (itemTitle: string) => void
}

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '18ch',
        [theme.breakpoints.up('sm')]: {
            '&:focus': {
                width: '24ch',
            },
        },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    textTransform: 'none',
    fontWeight: 400,
}));

export default function Header({
    setItemTitle
}: HeaderProps) {
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const applySearch = () => {
        const trimmed = inputValue.trim();
        setItemTitle(trimmed);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary" >
                <Toolbar sx={{ display: 'flex', gap: 1 }}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Fortnite Shop
                    </Typography>

                    {!isCartPage && (
                        <>
                            <Search>
                                <StyledInputBase
                                    placeholder="Search…"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={(event) => {
                                        if (event.code === "Enter") {
                                            event.preventDefault();
                                            applySearch();
                                        }
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>

                            <StyledButton
                                onClick={applySearch}
                            >
                                <SearchIcon />
                            </StyledButton>
                            
                            <Button
                                component={RouterLink}
                                to="/cart"
                                endIcon={<ShoppingCartCheckoutIcon />}
                                color="inherit"
                                sx={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.25)',
                                    },
                                    textTransform: 'none',
                                    fontWeight: 400,
                                    ml: 2,
                                    px: 2,
                                    height: '40px',
                                }}
                            >
                                Cart
                            </Button>
                        </>
                    )}
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
}