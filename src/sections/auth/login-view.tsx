'use client';

import { Box, Card, Container, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import LoginForm from './login/login-form';
import AuthLayout from 'src/layouts/auth/AuthLayout';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

export default function LoginView() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AuthLayout>
        حساب کاربری ندارید؟ &nbsp;
        <Link sx={{ textDecoration: 'none' }} href={paths.auth.register}>
          ثبت نام
        </Link>
      </AuthLayout>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          به حسابدار خوش آمدید
        </Typography>
        <Image src="/assets/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                ورود به سامانه حسابدار
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                اطلاعات کاربری خود را وارد کنید
              </Typography>
            </Box>
          </Stack>
          <LoginForm />
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, display: { xs: 'block', sm: 'none' } }}
          >
            حساب کاربری ندارید؟&nbsp;
            <Link sx={{ textDecoration: 'none' }} href={paths.auth.register}>
              ثبت نام
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Box>
  );
}
