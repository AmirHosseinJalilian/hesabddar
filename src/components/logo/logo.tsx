import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 48,
          height: 48,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 512 512"><path fill="#1fbd00" d="M443.1 0H71.9C67.9 37.3 37.4 67.8 0 71.7v371.5c37.4 4.9 66 32.4 71.9 68.8h372.2c3-36.4 32.5-65.8 67.9-69.8V71.7c-36.4-5.9-65-35.3-68.9-71.7m-37 404.9c-36.3 0-18.8-2-55.1-2c-35.8 0-21 2-56.1 2c-5.9 0-4.9-8.2 0-9.8c22.8-7.6 22.9-10.2 24.6-12.8c10.4-15.6 5.9-83 5.9-113c0-5.3-6.4-12.8-13.8-12.8H200.4c-7.4 0-13.8 7.5-13.8 12.8c0 30-4.5 97.4 5.9 113c1.7 2.5 1.8 5.2 24.6 12.8c4.9 1.6 6 9.8 0 9.8c-35.1 0-20.3-2-56.1-2c-36.3 0-18.8 2-55.1 2c-7.9 0-5.8-10.8 0-10.8c10.2-3.4 13.5-3.5 21.7-13.8c7.7-12.9 7.9-44.4 7.9-127.8V151.3c0-22.2-12.2-28.3-28.6-32.4c-8.8-2.2-4-11.8 1-11.8c36.5 0 20.6 2 57.1 2c32.7 0 16.5-2 49.2-2c3.3 0 8.5 8.3 1 10.8c-4.9 1.6-27.6 3.7-27.6 39.3c0 45.6-.2 55.8 1 68.8c0 1.3 2.3 12.8 12.8 12.8h109.2c10.5 0 12.8-11.5 12.8-12.8c1.2-13 1-23.2 1-68.8c0-35.6-22.7-37.7-27.6-39.3c-7.5-2.5-2.3-10.8 1-10.8c32.7 0 16.5 2 49.2 2c36.5 0 20.6-2 57.1-2c4.9 0 9.9 9.6 1 11.8c-16.4 4.1-28.6 10.3-28.6 32.4v101.2c0 83.4.1 114.9 7.9 127.8c8.2 10.2 11.4 10.4 21.7 13.8c5.8 0 7.8 10.8 0 10.8"/></svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
