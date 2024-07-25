import { Box, Button, Container, Link, Stack, StackProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback } from 'react';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import { Icon } from '@iconify/react';
import { paths } from 'src/routes/paths';
import flashFill from '@iconify/icons-eva/flash-fill';
import LoginIdentity from 'src/_requests/auth/loginIdentity';
import { useSignInMutation } from 'src/_req-hook/auth/useLoginIdentity';

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
    },
  })
);

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  filter: `drop-shadow(40px 80px 80px rgba(0, 0, 0, 0.48))`,
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh',
  },
}));

export default function HomeHero() {
  const {
    mutate: signIn,
    isLoading,
    error,
    data,
  } = useSignInMutation({
    onSuccess: (data) => {
      // Handle success (e.g., save token, redirect, etc.)
      console.log('Sign in successful:', data);
      console.log('123', data);
    },
    onError: (error) => {
      // Handle error
      console.error('Sign in failed:', error);
    },
  });

  const handelMoadian = () => {
    signIn({
      // userNameOrEmail: '0372177611',
      // password: '39929556',
      userNameOrEmail: 'nikfan',
      password: 'nikfan@123',
      rememberMe: true,
    });
  };
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varFade().in}>
        <HeroOverlayStyle alt="overlay" src="/assets/overlay.svg" variants={varFade().in} />

        <HeroImgStyle alt="hero" src="/assets/home/hero.png" variants={varFade().inUp} />

        <Container maxWidth="lg">
          <ContentStyle>
            <m.div variants={varFade().in}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                نرم‌ افزار
                <br />
                واسط
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;حسابدار&nbsp;
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                ارسال صورتحساب الکترونیکی به سامانه مؤدیان
              </Typography>
            </m.div>

            <Stack
              component={m.div}
              variants={varFade().inRight}
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              {/* <img alt="sketch icon" src="/static/home/ic_sketch.svg" width={20} height={20} /> */}
              <Button sx={{ color: 'common.white', bgcolor: '#999900' }} onClick={handelMoadian}>
                Moadian
              </Button>
            </Stack>

            <m.div variants={varFade().inRight}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                href={paths.auth.login}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                شروع کن
              </Button>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
