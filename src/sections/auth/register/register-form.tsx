import { Alert, Collapse, IconButton, InputAdornment, Link, Stack } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import React, { useState } from 'react';
import FormProvider from 'src/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';
import { useSelector } from 'src/redux/store';
import { sessionCodeSelector, registerPhoneSelector } from 'src/redux/slices/auth';
import { useAuthContext } from 'src/auth/hooks';

export const passwordValidation = Yup.string()
  .label('کلمه عبور')
  .required('کلمه عبور ضروری است')
  .min(8, 'کلمه عبور باید حداقل 8 حرف باشد')
  .test('uppercase', 'کلمه عبور باید یک حرف بزرگ داشته باشد', (value) =>
    /(?=.*[A-Z])/.test(value || '')
  )
  .test('lowercase', 'کلمه عبور باید یک حرف کوچک داشته باشد', (value) =>
    /(?=.*[a-z])/.test(value || '')
  )
  .test('number', 'کلمه عبور باید یک عدد داشته باشد', (value) => /(?=.*\d)/.test(value || ''));

export const phoneValidation = Yup.string()
  .label('شماره موبایل')
  .required()
  .matches(/^(09\d{9})$/, 'شماره موبایل باید با 09 شروع شود و شامل 11 رقم باشد');

export default function RegisterForm() {
  const { register } = useAuthContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inviteCodeExpanded, setInviteCodeExpanded] = useState(true);
  const router = useRouter();

  const phone = useSelector(registerPhoneSelector);
  const session_code = useSelector(sessionCodeSelector);

  const SendCodeFormSchema = Yup.object().shape({
    phone: phoneValidation,
    password: passwordValidation,
    invite_code: Yup.string().label('کد دعوت'),
    name: Yup.string().label('نام').min(2, 'حداقل باید 2 حرف باشد').max(200),
    last_name: Yup.string().label('نام خانوادگی').min(2).max(200),
    session_code: Yup.string().label('کد تایید شماره موبایل'),
  });

  const defaultValues = {
    name: '',
    password: '',
    last_name: '',
    invite_code: '',
    phone,
    session_code,
  };

  const methods = useForm({
    resolver: yupResolver(SendCodeFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(
        data.name || '',
        data.last_name || '',
        data.phone || '',
        data.password,
        data.invite_code || '',
        data.session_code || ''
      );
    } catch (error) {
      console.error(error);
    }

    router.push(paths.dashboard.general.banking);
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {errors.root && <Alert severity="error">{errors.root?.message}</Alert>}
      <Stack spacing={3}>
        <RHFTextField name="phone" disabled label="شماره موبایل" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="نام" />
          <RHFTextField name="last_name" label="نام خانوادگی" />
        </Stack>
        <RHFTextField
          name="password"
          label="کلمه عبور"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link
          sx={{ cursor: 'pointer' }}
          onClick={() => setInviteCodeExpanded((expanded) => !expanded)}
          underline="none"
          variant="button"
          component="div"
        >
          کد معرف دارم
        </Link>
        <Collapse in={inviteCodeExpanded}>
          <RHFTextField name="invite_code" label="کد معرف" />
        </Collapse>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={isSubmitting}
        >
          ثبت نام
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
