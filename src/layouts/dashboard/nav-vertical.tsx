'use client';

import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Avatar, Link, Typography } from '@mui/material';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
//
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton } from '../_common';
import { useAuthContext } from 'src/auth/hooks';
import GetUser from 'src/_requests/user/getUser';
import { useGetUserQuery } from 'src/_req-hook/user/useGetUserQuery';
import { RootState, useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

const AccountStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
}));

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');
  // const { user } = useAuthContext();

  const navData = useNavData();
  // const { data } = useGetUserQuery();

  // TODO:const user = useSelector((state)=>state.user)
  // const user = useSelector((state:RootState) => state.user);\
  // login(data.userNameOrEmail, data.password, data.rememberMe || false)
  // const user = useGetUserQuery("1")
  // console.log('333333333333333333',user);
  
  // {console.log('21',user)}

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />
      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link href="/">
          <AccountStyle>
            <Avatar />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {/* {user + ' ' + user} */}
                {/* امیرحسین جلیلیان */}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {user?.roles
                  ?.map(
                    (role: RoleData) =>
                      FA_ROLES[role.title as keyof typeof FA_ROLES]
                  )
                  .join(", ")} */}
                مدیر, حسابدار, توسعه دهنده
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSectionVertical
        data={navData}
        config={{
          // currentRole: user?.role || "admin",
          currentRole: 'admin',
        }}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
