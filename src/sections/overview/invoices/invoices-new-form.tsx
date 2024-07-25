import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
// utils
import { fCurrency } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { usePathname, useRouter } from 'src/routes/hooks';
// _req
import { useSaleFactorConfirmationsQuery } from 'src/_req-hook/sale_factor_confirmation/useSaleFactorConfirmationsQuery';
// hook-form
import FormProvider, { RHFTextField, RHFAutocomplete, RHFSelect } from 'src/components/hook-form';
// types
import { SaleFactorConfirmationData } from 'src/@types/sale_factor_confirmation/saleFactorConfirmationData';
import { CreateSaleFactorConfirmationRequestBodyType } from 'src/@types/sale_factor_confirmation/createSaleFactorConfirmationData';
// @iconify
// lodash
import { toInteger } from 'lodash';
// jalali-moment
import moment from 'jalali-moment';
// components
import Iconify from 'src/components/iconify';
import StuffList from '../stuff/stuff-list';
import { useCreateAddInvoiceMutation } from 'src/_req-hook/add_invoice/useCreateAddInvoiceMutation';
import { enqueueSnackbar } from 'notistack';
import { useCreateSaleFactorTaxMutation } from 'src/_req-hook/sale_factor_tax/useCreateSaleFactorTaxMutation';
import { setErrors } from 'src/utils/errors';
import { useCreateSaleFactorTaxStatusMutation } from 'src/_req-hook/sale_factor_tax_status/useCreateSaleFactorTaxStatusMutation';
import NewFormCard from 'src/components/new-form-card';

// ----------------------------------------------------------------------

const defaultBillType = [
  { value: 1, label: 'نوع 1' },
  { value: 2, label: 'نوع 2' },
];

// const defaultSaleType = [
//   { value: 0, label: 'فروش' },
//   { value: 1, label: 'صادرات' },
// ];

const defaultPostType = [
  { value: 1, label: 'اصلی' },
  { value: 2, label: 'ابطالی' },
  { value: 3, label: 'اصلاحی' },
  { value: 4, label: 'بازگشت از فروش' },
];

const defaultSettlementMethod = [
  { value: 1, label: 'نقدی' },
  { value: 2, label: 'نسیه' },
  { value: 3, label: 'نقدی/نسیه' },
];
type InvoiceNewFormProps = {
  currentInvoice?: SaleFactorConfirmationData | undefined;
  id?: number;
  editMode?: boolean;
  deleteMode?: boolean;
  createMode?: boolean;
  returnMode?: boolean;
  // editMod:boolean | undefined;
};
export default function InvoiceNewFrom({
  currentInvoice,
  id,
  editMode,
  deleteMode,
  createMode,
  returnMode,
}: InvoiceNewFormProps) {
  const router = useRouter();

  const param = usePathname();
  console.log('123123', param);

  // const [selectedSettlementMethod, setSelectedSettlementMethod] = useState<string>('نقدی');
  // const [pecuniaryPaymentAmount, setPecuniaryPaymentAmount] = useState<any>(0);/
  // const [creditPaymentAmount, setCreditPaymentAmount] = useState<any>();

  const calculateTotal = () => {
    let totalAmount = 0;
    currentInvoice?.details.map((details) => {
      const total = details.unitCost * details.count;
      totalAmount += total;
    });
    return totalAmount;
  };

  const NewSaleFactorConfirmationSchema = Yup.object().shape({
    factorNumber: Yup.string(),
    billType: Yup.number(),
    // billType: Yup.object(),
    saleType: Yup.number(),
    // saleType: Yup.object(),
    postType: Yup.number(),
    settlementMethod: Yup.number(),
    cashAmount: Yup.number(),
    loanAmount: Yup.number(),

    // SettlementMethod: Yup.object(),

    invoiceCreationDate: Yup.date(),
    // saleType: Yup.number(),
    count: Yup.number(),
    unitCost: Yup.number(),
    commodityDiscount: Yup.number(),
    iSCommodityDiscount: Yup.boolean(),
    vat: Yup.number(),
    comodityCod: Yup.string(),
    commodityName: Yup.string(),
    unitCount: Yup.number(),
    basePrice: Yup.number(),
    name: Yup.string(),
    pepoleType: Yup.number(),
    codPepole: Yup.string(),
    nationalityCode: Yup.string(),
    phone: Yup.string(),
    address: Yup.string(),
    totalAmountBeforeDeductionOfDiscount: Yup.number(),
    totalDiscounts: Yup.number(),
    customLicenseNumber: Yup.number(),
    totalAmountForInvoice: Yup.number(),
    totalNationalitiesOnAddedValue: Yup.number(),
    totalBill: Yup.number(),
    pecuniaryPaymentAmount: Yup.number(),
    creditPaymentAmount: Yup.number(),
  });

  const defaultValues: any = useMemo(
    () => ({
      factorNumber: currentInvoice?.factorNumber || '',
      // billType:
      //   defaultBillType.find((i) => i.value === currentInvoice?.saleFactorTax?.billType) || 1,
      billType: currentInvoice?.saleFactorTax?.billType || 1,

      // saleType: defaultSaleType.find((i) => i.value === currentInvoice?.saleType) || 0,
      // postType: defaultPostType.find(
      //   (i) => i.value === currentInvoice?.saleFactorTax?.postType
      // ) || { value: 1, label: 'اصلی' },
      // postType: currentInvoice?.saleFactorTax?.postType || 1,
      postType:
        currentInvoice?.saleFactorTax?.postType ||
        (editMode && !deleteMode && !createMode && !returnMode
          ? 3
          : deleteMode && !editMode && !createMode && !returnMode
          ? 2
          : createMode && !editMode && !deleteMode && !returnMode
          ? 1
          : returnMode && !editMode && !deleteMode && !createMode
          ? 4
          : 1),
      settlementMethod: currentInvoice?.saleFactorTax?.settlementMethod || 1,

      cashAmount: currentInvoice?.saleFactorTax?.cashAmount || 0,
      loanPaymentAmount: currentInvoice?.saleFactorTax?.loanAmount || 0,
      creationDate: currentInvoice?.saleFactorTax?.creationDate || new Date(),
      // inja chetori bayad handel beshe
      // SettlementMethod: defaultSettlementMethod.find(
      //   (i) => i.value === currentInvoice?.saleFactorTax?.settlementMethod
      // ) || { value: 1, label: 'نقدی' },
      // settlementMethod: 'نقدی',

      saleType: currentInvoice?.saleType || 0,
      count: currentInvoice?.details?.[0]?.count,
      unitCost: currentInvoice?.details?.[0]?.unitCost,
      commodityDiscount: currentInvoice?.details?.[0]?.commodityDiscount,
      iSCommodityDiscount: currentInvoice?.details?.[0]?.iSCommodityDiscount,
      vat: currentInvoice?.details?.[0]?.vat,
      comodityCod: currentInvoice?.details?.[0]?.commodity.commodityCod,
      commodityName: currentInvoice?.details?.[0]?.commodity.commodityName,
      unitCount: currentInvoice?.details?.[0]?.commodity.unitCount,
      basePrice: currentInvoice?.details?.[0]?.commodity.basePrice,
      name: currentInvoice?.pepoleGrouping.pepole?.name || '',
      pepoleType: currentInvoice?.pepoleGrouping.pepole?.pepoleType || 1,
      codPepole: currentInvoice?.pepoleGrouping.pepole?.codPepole,
      nationalityCode:
        currentInvoice?.pepoleGrouping.pepole?.pepoleDescription?.nationalityCode || '',
      phone: currentInvoice?.pepoleGrouping.pepole?.pepoleDescription?.phone || '',
      address: currentInvoice?.pepoleGrouping.pepole?.pepoleDescription?.address || '',
      totalAmountBeforeDeductionOfDiscount: calculateTotal() || 0,
      totalDiscounts: 0,
      customLicenseNumber: 0,
      totalAmountForInvoice: 0,
      totalNationalitiesOnAddedValue: 0,
      totalBill: 0,
      // pecuniaryPaymentAmount: 0,
      // creditPaymentAmount: 0,
    }),
    [currentInvoice]
  );
  console.log('1', currentInvoice?.saleFactorTax?.billType);
  console.log('000000', editMode);
  console.log('111111', deleteMode);

  const methods = useForm({
    resolver: yupResolver(NewSaleFactorConfirmationSchema) as any,
    defaultValues,
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

  useEffect(() => {
    if (currentInvoice) {
      reset(defaultValues);
    }
  }, [currentInvoice, defaultValues, reset]);

  const { data: invoice, isLoading: invoicesLoading } = useSaleFactorConfirmationsQuery({
    id,
    page: 1,
    per_page: 10000,
    // TODO: auto complete search server side
  });
  const cinvoice = invoice?.data?.items?.[0];

  //totalAmountBeforeDeductionOfDiscount => Tprdis
  //totalDiscounts => Tdis
  //customLicenseNumber => Tadis
  //totalNationalitiesOnAddedValue => Tvam
  //totalBill => Tbill
  //settlementMethod => Setm
  //نقدی => Cap
  //نسیه => Insp
  const { mutateAsync: CreateSaleFactorTax } = useCreateSaleFactorTaxMutation();
  // const { mutateAsync: CreateSaleFactorTaxStatus } = useCreateSaleFactorTaxStatusMutation();
  // const [numericId, setNumericId] = useState<number>();
  // const handleConvert = () => {
  //   const parsedId = Number(id); // Convert string to number
  //   if (!isNaN(parsedId)) {
  //     setNumericId(parsedId);
  //   } else {
  //     console.error('Invalid ID: cannot convert to number');
  //   }
  // };
  const onSubmit = handleSubmit(async (data) => {
    console.log('test', data);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // if ((editMode = true)) {
      // handleConvert()
      console.log('bad', { saleFactorConfirmationID: id });

      await CreateSaleFactorTax({
        saleFactorConfirmationID: id,
        billType: data.billType,
        postType: data.postType,
        settlementMethod: data.settlementMethod,
        cashAmount: data.cashAmount,
        loanAmount: data.loanAmount,
      });

      // }
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

  // await createAddInvoice({
  //   id: 0,
  //   originInvoiceId: '',
  //   companyId: 0,
  //   customerId: 0,
  //   parentId: 0,
  //   childId: 0,
  //   taxid: '',
  //   orderDate: '', //تاریخ و زمان صدور صورتحساب
  //   registerDate: '', //تاریخ و زمان ایجاد صورتحساب
  //   inty: 0, // نوع صورت حساب
  //   inno: '',
  //   irtaxid: '',
  //   inp: 0, // الگوی صورت حساب
  //   ins: 0,
  //   tins: '',
  //   tob: data.pepoleType,
  //   bid: data.nationalityCode,
  //   tinb: '',
  //   sbc: '',
  //   bpc: '',
  //   bbc: '',
  //   ft: 0,
  //   bpn: '',
  //   scln: '',
  //   scc: '',
  //   crn: '',
  //   billid: '',
  //   tprdis: data.totalAmountBeforeDeductionOfDiscount || 0,
  //   tdis: data.totalDiscounts || 0,
  //   tadis: data.customLicenseNumber || 0,
  //   tvam: data.totalNationalitiesOnAddedValue || 0,
  //   todam: 0,
  //   tbill: data.totalBill || 0,
  //   setm: 0,
  //   cap: 0,
  //   insp: 0,
  //   tvop: 0,
  //   tax17: 0,
  //   cdcn: '',
  //   cdcDate: '',
  //   tonw: 0,
  //   torv: 0,
  //   tocv: 0,
  //   uid: '',
  //   referenceNumber: '',
  //   status: 0,
  //   bodies: [],
  //   payments: [],
  //   postCustomerData: false,
  // });

  // const handleCreditPaymentChange = (event: { target: { value: any } }) => {
  //   let value = toInteger(event.target.value);
  //   if (value > pecuniaryPaymentAmount) {
  //     value = pecuniaryPaymentAmount;
  //   }
  //   setCreditPaymentAmount(value);
  //   const updatedPecuniaryPaymentAmount = pecuniaryPaymentAmount - value;
  //   setPecuniaryPaymentAmount(updatedPecuniaryPaymentAmount);
  // };

  useEffect(() => {
    if (!currentInvoice?.details || !currentInvoice?.details?.[0]) return;

    setValue(
      'totalDiscounts',
      currentInvoice?.details?.[0].iSCommodityDiscount!
        ? (watch('totalAmountBeforeDeductionOfDiscount') *
            +currentInvoice?.details?.[0].commodityDiscount!) /
            100
        : +currentInvoice?.details?.[0].commodityDiscount!
    );

    setValue(
      'customLicenseNumber',
      watch('totalAmountBeforeDeductionOfDiscount') - watch('totalDiscounts')
    );

    setValue(
      'totalAmountForInvoice',
      +currentInvoice?.details?.[0]?.count * +currentInvoice?.details?.[0]?.unitCost
    );

    setValue(
      'totalNationalitiesOnAddedValue',
      (+currentInvoice?.details?.[0]?.vat / 100) * watch('customLicenseNumber')
    );

    setValue('totalBill', watch('customLicenseNumber') + watch('totalNationalitiesOnAddedValue'));
  }, [currentInvoice?.details]);

  useEffect(() => {
    setValue('cashAmount', watch('totalBill'));

    if (watch('settlementMethod') === 1) {
      setValue('cashAmount', watch('totalBill'));
      setValue('loanAmount', 0);
    } else if (watch('settlementMethod') === 2) {
      setValue('loanAmount', watch('totalBill'));
      setValue('cashAmount', 0);
    } else if (watch('settlementMethod') === 3) {
      setValue('cashAmount', watch('totalBill'));
    }
  }, [watch('settlementMethod'), currentInvoice?.details]);

  useEffect(() => {
    setValue('cashAmount', watch('totalBill') - watch('loanAmount'));
    if (watch('cashAmount') <= 0) setValue('cashAmount', 0);
  }, [watch('loanAmount'), currentInvoice?.details]);

  // const options = (invoice?.data.items || []).map((item) => ({
  //   ...item,
  //   // Assuming saleFactorTax is an object and billType is a boolean
  //   billType: item.SaleFactorTax?.billType ?? false,
  // }));

  // const finalOptions = options.length > 0 ? options : defaultOptions;
  const disabled = watch('title') === '';
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        disable={disabled}
        // title={currentDifficulty ? `ویرایش سطح سختی ${currentDifficulty.title}` : 'سطح سختی جدید'}
        loading={isSubmitting}
      >
        <Grid container>
          <Grid xs={12} md={12}>
            {editMode && (
              <Typography variant="h4" sx={{ pb: 3 }}>
                اصلاح فاکتور
              </Typography>
            )}

            <Stack direction="row" spacing={2}>
              {/* <RHFAutocomplete
                name="billType"
                fullWidth
                label="نوع صورت حساب"
                // defaultValue={billType[0]}
                autoHighlight
                // disableClearable
                // options={billType.map((option) => option)}
                options={invoice?.data.items || []}
                getOptionLabel={(option) =>
                  typeof option === 'boolean'
                    ? option
                    : option.saleFactorTax.billType || ''
                }
                // renderOption={(props, option) => (
                //   <li {...props} key={option}>
                //     {option}
                //   </li>
                // )}
              /> */}
              {/* <RHFAutocomplete
                name="billType"
                disableClearable
                fullWidth
                label="نوع صورت حساب"
                onClick={(a) => console.log("aaaaa", a)
                }
                autoHighlight
                options={defaultBillType} // Use finalOptions here
                getOptionLabel={(option) =>
                  typeof option === 'number'
                    ? option === 1
                      ? 'نوع 1'
                      : 'نوع 2'
                      : ''
                }
              /> */}
              <RHFSelect name="billType" label="نوع صورت حساب">
                {defaultBillType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              {/* <RHFAutocomplete
                name="saleType"
                fullWidth
                label="الگوی صورت حساب"
                // defaultValue={defaultInvoiceTemplate}
                autoHighlight
                disableClearable
                options={defaultSaleType}
                getOptionLabel={(option: any) =>
                  option.label
                }
              /> */}

              {/* <RHFSelect name="saleType" label="الگوی صورت حساب">
                {defaultSaleType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect> */}

              <RHFTextField
                name="saleType"
                label="الگوی صورت حساب"
                disabled
                valueGetter={(params) =>
                  params.value === 0 ? 'فروش' : params.value === 1 ? 'صادرات' : ''
                }
              />

              {/* <RHFAutocomplete
                name="postType"
                fullWidth
                label="نوع فاکتور"
                // defaultValue={type[0]}
                disabled
                disableClearable
                autoHighlight
                options={defaultPostType}
                getOptionLabel={(option: any) => option.label}
              /> */}

              <RHFSelect name="postType" label="نوع فاکتور" disabled>
                {defaultPostType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="dateFactorSale"
                label="تاریخ صدور صورتحساب"
                disabled
                valueGetter={(params: { value: any }) => {
                  const gregorianDate = currentInvoice?.dateFactorSale;
                  const solarDate = moment(gregorianDate).format('jYYYY/jMM/jDD HH:mm:ss');
                  return solarDate;
                }}
              />
              <RHFTextField
                name="creationDate"
                label="تاریخ ایجاد صورتحساب"
                disabled
                valueGetter={(params: { value: any }) => {
                  const gregorianDateTime = params.value;
                  const solarDateTime = moment(gregorianDateTime).format('jYYYY/jMM/jDD HH:mm:ss');
                  return solarDateTime;
                }}
              />
              <RHFTextField name="factorNumber" label="شماره فاکتور" disabled />
            </Stack>
            <Divider
              variant="middle"
              style={{ margin: '20px 0', borderStyle: 'dashed', borderColor: 'black' }}
            />
            <Stack spacing={3}>
              <Card sx={{ p: 3, border: '1px solid', borderColor: 'secondary.main' }}>
                <Stack spacing={2}>
                  <Typography variant="h5" sx={{ pb: 3 }}>
                    اطلاعات خریدار
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <RHFTextField
                      name="name"
                      label="خریدار"
                      disabled // Disable editing
                    />
                    {/* <RHFAutocomplete
                      fullWidth
                      name="name"
                      disabled
                      options={invoice?.data.items || []}
                      getOptionLabel={(option) =>
                        typeof option === 'string'
                          ? option
                          : currentInvoice?.pepoleGrouping?.pepoles?.[0].name || ''
                      }
                      loading={invoicesLoading}
                      label="خریدار"
                    /> */}
                    <RHFTextField
                      name="nationalityCode"
                      label="شماره / شناسه ملی (خریدار)"
                      disabled // Disable editing
                    />
                    {/* <RHFAutocomplete
                      name="nationalityCode"
                      fullWidth
                      disabled
                      freeSolo
                      label="شماره / شناسه ملی (خریدار)"
                      autoHighlight
                      options={invoice?.data.items || []}
                      getOptionLabel={(option) =>
                        typeof option === 'string'
                          ? option
                          : option.pepoleGrouping?.pepoles?.[0].pepoleDescriptions?.[0]
                              .nationalityCode || ''
                      }
                      loading={invoicesLoading}
                    /> */}
                    {/* <RHFTextField name="economicNumberBuyer" label="شماره اقتصادی خریدار" /> */}

                    <RHFAutocomplete
                      name="phone"
                      fullWidth
                      disabled
                      freeSolo
                      label="تلفن"
                      autoHighlight
                      options={invoice?.data.items || []}
                      getOptionLabel={(option) =>
                        typeof option === 'string'
                          ? option
                          : option.pepoleGrouping.pepole.pepoleDescription.phone || ''
                      }
                      loading={invoicesLoading}
                    />
                    {/* TODO: check shavad */}
                    <RHFAutocomplete
                      name="pepoleType"
                      fullWidth
                      disabled
                      freeSolo
                      label="نوع شخص خریدار"
                      autoHighlight
                      options={invoice?.data.items || []}
                      getOptionLabel={(option) =>
                        typeof option === 'number'
                          ? option === 1
                            ? 'حقوقی'
                            : option === 2
                            ? 'حقیقی'
                            : ''
                          : ''
                      }
                      loading={invoicesLoading}
                    />
                  </Stack>
                  <RHFAutocomplete
                    name="address"
                    fullWidth
                    disabled
                    freeSolo
                    label="آدرس"
                    autoHighlight
                    options={invoice?.data.items || []}
                    getOptionLabel={(option) =>
                      typeof option === 'string'
                        ? option
                        : option.pepoleGrouping.pepole.pepoleDescription.address || ''
                    }
                    loading={invoicesLoading}
                  />
                </Stack>
              </Card>
              <Card sx={{ p: 3, border: '1px solid', borderColor: 'secondary.main' }}>
                <Stack spacing={2}>
                  <Typography variant="h5">خلاصه صورت حساب</Typography>
                  <Stack direction="row" spacing={2}>
                    <RHFTextField
                      name="totalAmountBeforeDeductionOfDiscount"
                      label="مجموع مبلغ قبل از کسر تخفیف"
                      disabled // Disable editing
                      value={fCurrency(watch('totalAmountBeforeDeductionOfDiscount'))}
                    />
                    <RHFTextField name="totalDiscounts" label="مجموع تخفیفات" disabled />
                    <RHFTextField
                      name="customLicenseNumber"
                      label="مجموع مبلغ پس از کسر تخفیفات"
                      disabled // Disable editing
                      value={fCurrency(watch('customLicenseNumber'))}
                    />
                    <RHFTextField
                      name="totalNationalitiesOnAddedValue"
                      label="مجموع مالیات بر ارزش افزوده"
                      disabled // Disable editing
                      value={fCurrency(watch('totalNationalitiesOnAddedValue'))}
                    />
                  </Stack>

                  <Grid xs={12}>
                    <Stack direction="row" spacing={2}>
                      <Grid xs={12} md={6}>
                        <Stack direction="row" spacing={2}>
                          <RHFTextField
                            name="totalBill"
                            label="مجموع صورتحساب"
                            disabled // Disable editing
                            value={fCurrency(watch('totalBill'))}
                          />
                          {/* <RHFAutocomplete
                            fullWidth
                            options={defaultSettlementMethod}
                            autoHighlight
                            name="settlementMethod"
                            disableClearable
                            getOptionLabel={(option: any) => option.label}
                            label="روش تسویه"
                          /> */}
                          <RHFSelect name="settlementMethod" label="روش تسویه">
                            {defaultSettlementMethod.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </RHFSelect>
                        </Stack>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <Stack direction="row" spacing={2}>
                          {watch('settlementMethod') === 1 && (
                            <RHFTextField
                              name="cashAmount"
                              label="مبلغ پرداختی نقدی"
                              disabled
                              value={fCurrency(watch('cashAmount'))}
                            />
                          )}
                          {watch('settlementMethod') === 2 && (
                            <RHFTextField
                              name="loanAmount"
                              label="مبلغ پرداختی نسیه"
                              disabled
                              value={fCurrency(watch('loanAmount'))}
                            />
                          )}
                          {watch('settlementMethod') === 3 && (
                            <>
                              <RHFTextField
                                name="cashAmount"
                                label="مبلغ پرداختی نقدی"
                                disabled
                                value={fCurrency(watch('cashAmount'))}
                              />

                              <RHFTextField
                                name="loanAmount"
                                label="مبلغ پرداختی نسیه"
                                type="number"
                                // value={fCurrency(watch('creditPaymentAmount'))}
                              />
                            </>
                          )}
                        </Stack>
                      </Grid>
                    </Stack>
                  </Grid>
                </Stack>
              </Card>
              <Card sx={{ p: 3, border: '1px solid', borderColor: 'secondary.main' }}>
                <Stack spacing={3}>
                  {/* <Stack direction="row" spacing={3}>
                    <Typography variant="h5">قلم کالا</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Icon icon="ph:list-plus-bold" />}
                      onClick={() => {
                        router.push(paths.dashboard.general.invoices.root);
                      }}
                    >
                      افزودن قلم کالا
                    </Button>
                  </Stack> */}
                  <Stack direction="row" spacing={2}>
                    <StuffList currentStuff={currentInvoice?.details} />
                  </Stack>
                </Stack>
              </Card>
            </Stack>
            {/* <RHFTextField name="role" label="Role" /> */}
            {/* </Box> */}
            {/* <Stack alignItems="center">
              <Stack alignItems="center" spacing={3} direction="row" sx={{ mt: 3 }}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={isSubmitting}
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Iconify icon="ph:plus-fill" />
                    افزودن
                  </Stack>
                </LoadingButton>
                <Button variant="contained" onClick={() => router.back()} color="secondary">
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Iconify icon="fa6-solid:xmark" />
                    انصراف
                  </Stack>
                </Button>
              </Stack>
            </Stack> */}
          </Grid>
        </Grid>
      </NewFormCard>
    </FormProvider>
  );
}

const billType = ['نوع 1', 'نوع 2'];
const invoiceTemplate = ['فروش', 'طلا و جواهر', 'صادرات'];
const type = ['اصلی', 'ابطال', 'اصلاح', 'برگشت از فروش'];
const settlementMethod = ['نقدی', 'نسیه', 'نقدی/نسیه'];
