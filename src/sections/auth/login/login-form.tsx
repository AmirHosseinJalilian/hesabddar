import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert, InputAdornment, IconButton, Link } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import * as Yup from 'yup';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useRouter } from 'next/navigation';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';

export default function LoginForm() {
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  const LoginFormSchema = Yup.object().shape({
    userNameOrEmail: Yup.string().required('نام کاربری اجباری است '),
    // .email('ایمیل باید یک آدرس ایمیل معتبر باشد'),
    rememberMe: Yup.boolean().label('مرا به خاطر بسپار'),
    password: Yup.string().label('کلمه عبور').required().min(8).max(128),
  });

  const defaultValues = {
    userNameOrEmail: 'nikfan',
    password: 'nikfan@123',
    rememberMe: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.userNameOrEmail, data.password, data.rememberMe || false);
      console.log('123',data);
      router.push(paths.dashboard.general.invoices.root);
    } catch (error) {
      console.log(error);
      enqueueSnackbar('خطایی در ورود رخ داد', { variant: 'error' });
    }
  });

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // this should use };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // const asfdsaf = () => {
  //   console.log('123', );
  // };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {errors.root && <Alert severity="error">{errors.root?.message}</Alert>}
        <RHFTextField name="userNameOrEmail" label="نام کاربری" />
        <RHFTextField
          name="password"
          label="رمزعبور"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="rememberMe" label="مرا به خاطر بسپار" />
        <Link href={paths.auth.forgotPassword} sx={{ textDecoration: 'none' }}>
          رمز عبور ام را فراموش کردم
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
      >
        ورود
      </LoadingButton>
      {/* <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={asfdsaf}
        loading={isSubmitting}
      >
        safdasdf
      </LoadingButton> */}
    </FormProvider>
  );
}
