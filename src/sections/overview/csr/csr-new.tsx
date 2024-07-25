import * as Yup from 'yup';

import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import FormProvider from "src/components/hook-form/form-provider"
import NewFormCard from "src/components/new-form-card"
import { enqueueSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import { usePathname, useRouter } from 'src/routes/hooks';
import { Stack } from '@mui/material';



export default function CSRNew() {
  const router = useRouter();
  const NewSaleFactorConfirmationSchema = Yup.object().shape({
    factorNumber: Yup.string(),
  });

  

  const methods = useForm({
    resolver: yupResolver(NewSaleFactorConfirmationSchema) as any,
    mode: 'onChange',
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  // const { mutateAsync: CreateSaleFactorTax } = useCreateSaleFactorTaxMutation();
  // const { mutateAsync: CreateSaleFactorTaxStatus } = useCreateSaleFactorTaxStatusMutation();

  const onSubmit = handleSubmit(async (data) => {
    console.log('test', data);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // await CreateSaleFactorTax(data);
      // await CreateSaleFactorTaxStatus(data);
      enqueueSnackbar('با موفقیت ثبت شد', { variant: 'success' });
      router.push(paths.dashboard.general.invoices.root);
    } catch (error) {
      setError('root', {
        message: error.message || 'ویرایش یا ایجاد با مشکل روبرو شد',
      });
      setErrors(error.data, setError);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard>
        <Stack direction='row' spacing={2}>

        <RHFTextField
          name="name"
          label="نام به انگلیسی"
          // disabled // Disable editing
          />
        <RHFTextField
          name="name"
          label="نام به فارسی"
          // disabled // Disable editing
          />
        <RHFTextField
          name="name"
          label="شناسه /کد ملی"
          // disabled // Disable editing
          />
          </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
