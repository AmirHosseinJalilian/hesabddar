import { LoadingButton } from '@mui/lab';
import { Button, Card, IconButton, Menu, MenuItem, Stack, Tooltip, Zoom } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import moment from 'jalali-moment';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SaleFactorConfirmationQueryFiltersType } from 'src/@types/sale_factor_confirmation/querySaleFactorConfirmationData';
import { SaleFactorConfirmationData } from 'src/@types/sale_factor_confirmation/saleFactorConfirmationData';
import { SaleFactorConfirmationDetailsData } from 'src/@types/sale_factor_confirmation_details/saleFactorConfirmationDetailsData';
import { useSaleFactorConfirmationsQuery } from 'src/_req-hook/sale_factor_confirmation/useSaleFactorConfirmationsQuery';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { fCurrency } from 'src/utils/format-number';


type StuffProps = {
  currentStuff?: SaleFactorConfirmationDetailsData[] | undefined;
};

export default function StuffList({ currentStuff }: StuffProps) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { enqueueSnackbar } = useSnackbar();
  const [saleFactorConfirmation, setSaleFactorConfirmation] =
    useState<SaleFactorConfirmationQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });
  const { isLoading, isError, data, refetch } = useSaleFactorConfirmationsQuery({
    page: page + 1, // Add 1 to page because backend uses 1-based indexing
    per_page: pageSize,
    order: 'desc',
    order_by: 'id',
    filters: saleFactorConfirmation, // You can add filters here
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Failed to load data', { variant: 'error' });
    }
  }, [isError, enqueueSnackbar]);



  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ردیف',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 90,
      },

      {
        field: 'commodityName',
        headerName: 'شرح کالا/خدمات',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 150,
        valueGetter: (params: GridRenderCellParams<any>) => (
          params.row.commodity?.commodityName)
      },
      {
        field: 'comodityCod',
        headerName: 'شناسه کالا/خدمات',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 150,
        valueGetter: (params: GridRenderCellParams<any>) => (
          params.row.commodity?.comodityCod)
      },
      {
        field: 'count',
        headerName: 'تعداد/مقدار',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 180,

      },
      {
        field: 'unitCost',
        headerName: 'مبلغ واحد',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 170,
        valueGetter: (params) => (fCurrency(params.row.unitCost)),
      },
      {
        field: 'amountBeforeDiscount',
        headerName: 'مبلغ قبل از تخفیف',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 150,
        valueGetter: (params) => (fCurrency(params.row.unitCost * params.row.count))
      },
      {
        field: 'discountAmount',
        headerName: 'مبلغ تخفیف',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 170,
        valueGetter: (params) => (params.row.iSCommodityDiscount ?
          (fCurrency(params.row.count * (params.row.unitCost * (params.row.commodityDiscount / 100)))) :
          params.row.iSCommodityDiscount === 0 ? 0 :
            (fCurrency(params.row.count * params.row.commodityDiscount)))
      },
      {
        field: 'amountAfterDiscount',
        headerName: 'مبلغ پس از تخفیف',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 170,
        valueGetter: (params) => {
          const amountBeforeDiscount = params.row.unitCost * params.row.count;
          const discount = params.row.iSCommodityDiscount === true
            ? params.row.count * (params.row.unitCost * (params.row.commodityDiscount / 100))
            : params.row.count * params.row.commodityDiscount;
          return fCurrency(amountBeforeDiscount - discount);
        }
      },
      {
        field: 'vat',
        headerName: 'نرخ مالیات برارزش افزوده',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 170,

      },
      {
        field: 'amountOfValueAddedTax',
        headerName: 'مبلغ مالیات برارزش افزوده',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 170,
        valueGetter: (params) => {
          const amountBeforeDiscount = params.row.unitCost * params.row.count;
          const discount = params.row.iSCommodityDiscount === true
            ? params.row.count * (params.row.unitCost * (params.row.commodityDiscount / 100))
            : params.row.count * params.row.commodityDiscount;
          return fCurrency(params.row.vat / 100 * (amountBeforeDiscount - discount));
        }
      },
      {
        field: 'totalAmountOfGoods',
        headerName: 'مبلغ کل کالا/خدمات',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 170,
        valueGetter: (params) => {
          const amountBeforeDiscount = params.row.unitCost * params.row.count;
          const discount = params.row.iSCommodityDiscount === true
            ? params.row.count * (params.row.unitCost * (params.row.commodityDiscount / 100))
            : params.row.count * params.row.commodityDiscount;
          const amountAfterDiscount = (amountBeforeDiscount - discount)
          const amountOfValueAddedTax = (params.row.vat / 100 * (amountBeforeDiscount - discount));
          return fCurrency(amountAfterDiscount + amountOfValueAddedTax);
        }
      },
    ],
    [refetch]
  );

  const handlePageChange = (params: GridPaginationModel) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };
  const handleSorts = (model: GridSortModel) => {
    setSort({
      order: model?.[0]?.sort || '',
      order_by: model?.[0]?.field || '',
    });
  };

  const handleFilter = (model: GridFilterModel) => {
    const newSaleFactorConfirmations = model.items.reduce(
      (acc: SaleFactorConfirmationQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setSaleFactorConfirmation(newSaleFactorConfirmations);
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <Card>
      <DataGrid
        loading={isLoading}
        pagination
        paginationMode="server"
        pageSizeOptions={[10]}
        paginationModel={{ page, pageSize }}
        columns={columns}
        rows={currentStuff || []}
        getRowId={(row) => row.id}
        rowCount={data?.data?.totalRows || 0}
        sortingMode="server"
        filterMode="server"
        onFilterModelChange={handleFilter}
        onSortModelChange={handleSorts}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        onPaginationModelChange={handlePageChange}
      />
    </Card>
  );
}
