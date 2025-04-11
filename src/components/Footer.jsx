import { Box, Typography, Link, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: 'primary.main', // Use the app's primary green color
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4 },
        mt: 'auto',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Links Section */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2 },
            justifyContent: 'center',
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              color: 'white', // White text
              textDecoration: 'none',
              fontFamily: 'Roboto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': { color: 'grey.300' }, // Lighter shade on hover
            }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/add-recipe"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'Roboto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': { color: 'grey.300' },
            }}
          >
            Add Recipe
          </Link>
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'Roboto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': { color: 'grey.300' },
            }}
          >
            Login
          </Link>
          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'Roboto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': { color: 'grey.300' },
            }}
          >
            Signup
          </Link>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            sx={{ color: 'white', '&:hover': { color: 'grey.300' } }} // White icons with hover effect
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            sx={{ color: 'white', '&:hover': { color: 'grey.300' } }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            sx={{ color: 'white', '&:hover': { color: 'grey.300' } }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} /> {/* Lighter white divider */}

      {/* Copyright Notice */}
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'white', // White text
          fontFamily: 'Roboto',
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
        }}
      >
        © {new Date().getFullYear()} Flavor Exchange. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;