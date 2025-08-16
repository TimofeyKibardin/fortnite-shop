import { JSX } from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme => theme.palette.secondary.main,
        color: theme => theme.palette.common.white,        // белый текст
        py: 2,                                             // отступы по вертикали
        mt: 'auto',                                        // прижать футер вниз
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Fortnite Shop. Pet Project
        </Typography>
      </Container>
    </Box>
  );
}