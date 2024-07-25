'use client';

import { Box, Card, Container, Link, Stack, Typography } from '@mui/material';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { RegisterForm } from 'src/sections/auth/register';
import { styled } from '@mui/material/styles';
import Image from 'src/components/image';
import AuthLayout from 'src/layouts/auth/AuthLayout';
import { paths } from 'src/routes/paths';
import { useSelector } from 'src/redux/store';
import { registerStepSelector } from 'src/redux/slices/auth';

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

export default function RegisterView() {
  const registerStep = useSelector(registerStepSelector);

  return (
    <Box sx={{ display: 'flex' }}>
      <AuthLayout>
        حساب کاربری دارید؟ &nbsp;
        <Link sx={{ textDecoration: 'none' }} href={paths.auth.login}>
          ورود
        </Link>
      </AuthLayout>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          با قابلمه غذاهای خوب و سالم بپز. نگران هیچی نباش
        </Typography>
        <Image src="/assets/illustrations/illustration_register.png" alt="register" />
      </SectionStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                ثبت نام در بخش مدیریت قابلمه
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                بخش مدیریت برای آشپزان قابلمه
              </Typography>
            </Box>
          </Stack>
          {registerStep === RegisterStepsEnum.Phone && <SendCodeForm />}
          {registerStep === RegisterStepsEnum.OTP && <VerifyCodeForm />}
          {registerStep === RegisterStepsEnum.Data && (
            <>
              <RegisterForm />
              <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                در هنگام ثبت‌نام&nbsp;
                {/* TODO: policy dialogs */}
                <Link underline="always" sx={{ color: 'text.primary' }}>
                  قوانین نرم‌افزار
                </Link>
                &nbsp;و&nbsp;
                <Link underline="always" sx={{ color: 'text.primary' }}>
                  مقررات حریم خصوصی
                </Link>
                &nbsp;را می‌پذیرم.
              </Typography>
            </>
          )}

          {/* <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, display: { xs: 'block', sm: 'none' } }}
          >
            حساب کاربری ندارید؟&nbsp;
            <Link sx={{ textDecoration: 'none' }} href={paths.auth.register}>
              ثبت نام
            </Link>
          </Typography> */}
        </ContentStyle>
      </Container>
    </Box>
  );
}
