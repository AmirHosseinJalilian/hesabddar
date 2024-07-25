import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Stack, Tooltip, Zoom, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import moment from 'jalali-moment';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useSaleFactorConfirmationsQuery } from 'src/_req-hook/sale_factor_confirmation/useSaleFactorConfirmationsQuery';
import Loading from 'src/app/dashboard/loading';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { SaleFactorConfirmationData } from 'src/@types/sale_factor_confirmation/saleFactorConfirmationData';
import {
  SaleFactorConfirmationQueryFiltersType,
  QuerySaleFactorConfirmationsResponseType,
} from 'src/@types/sale_factor_confirmation/querySaleFactorConfirmationData';

type ActionsMenuProps = {
  saleFactorConfirmation?: SaleFactorConfirmationData;
  reloadInvoice: () => void;
};

function ActionsMenu({ saleFactorConfirmation, reloadInvoice }: ActionsMenuProps) {
  const router = useRouter();
  const editMode = true;
  const deleteMode = true;
  const createMode = true;
  const returnMode = true;

  const handleEditInvoice = useCallback(() => {
    if (!saleFactorConfirmation) return;
    router.push(paths.dashboard.general.invoices.edit(saleFactorConfirmation.id, editMode));
  }, [saleFactorConfirmation, router]);

  const handleDeleteInvoice = useCallback(() => {
    if (!saleFactorConfirmation) return;
    router.push(paths.dashboard.general.invoices.delete(saleFactorConfirmation.id, deleteMode));
  }, [saleFactorConfirmation, router]);

  const handleCreateInvoice = useCallback(() => {
    if (!saleFactorConfirmation) return;
    router.push(paths.dashboard.general.invoices.create(saleFactorConfirmation.id, createMode));
  }, [saleFactorConfirmation, router]);

  const handleReturnFromSaleInvoice = useCallback(() => {
    if (!saleFactorConfirmation) return;
    router.push(
      paths.dashboard.general.invoices.return(saleFactorConfirmation.id, returnMode)
    );
  }, [saleFactorConfirmation, router]);
  // router.push(
  //   { pathname: '/path_of_component_b', query: { name: 'Someone' } },
  //   'path_of_component_b'
  // );

  // const handleEditCategory = useCallback(() => {
  //   if (!saleFactorConfirmation) return;
  //   router.push(
  //     { pathname: '/path_of_component_b', query: { name: 'Someone' } },
  //     'path_of_component_b'
  //   );
  // }, [saleFactorConfirmation, router]);

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip TransitionComponent={Zoom} title="دریافت PDF">
        <Button sx={{ minWidth: 20, bgcolor: 'orangered' }}>
          <Iconify icon="material-symbols-light:picture-as-pdf-rounded" sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="ابطال">
        <Button sx={{ minWidth: 20, bgcolor: '#b64551' }} onClick={handleDeleteInvoice}>
          <Iconify icon="fluent:prohibited-32-filled" width={18} sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="اصلاح">
        <Button sx={{ minWidth: 20, bgcolor: 'purple' }} onClick={handleEditInvoice}>
          <Iconify icon="fe:edit" width={18} sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="بازگشت از فروش">
        <Button sx={{ minWidth: 20, bgcolor: 'royalblue' }} onClick={handleReturnFromSaleInvoice}>
          <Iconify icon="icon-park-outline:return" width={18} sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="جزئیات">
        <Button sx={{ minWidth: 20, bgcolor: 'green' }} onClick={handleCreateInvoice}>
          <Iconify icon="zondicons:exclamation-solid" width={18} sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="استعلام">
        <Button sx={{ minWidth: 20, bgcolor: 'orange' }}>
          <Iconify icon="ri:menu-search-line" width={18} sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="ارسال">
        <Button sx={{ minWidth: 20, bgcolor: 'black' }}>
          <Iconify icon="icon-park-outline:send-one" width={18} sx={{ color: 'white' }} />
        </Button>
      </Tooltip>
    </Stack>
  );
}

export default function InvoicesListsMoadian() {
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
    order: sort.order,
    order_by: sort.order_by,
    filters: saleFactorConfirmation,
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Failed to load data', { variant: 'error' });
    }
  }, [isError, enqueueSnackbar]);

  const startRowId = useMemo(() => page * pageSize + 1, [page, pageSize]);

  const rowsWithLocalId = useMemo(() => {
    return (data?.data.items || []).map((item, index) => ({
      ...item,
      rowId: startRowId + index,
    }));
  }, [data, startRowId]);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'rowId',
        headerName: 'ردیف',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 90,
        valueGetter: (params) => params.row.rowId,
      },
      {
        field: 'Action',
        headerName: 'عملیات',
        headerAlign: 'center',
        align: 'center',
        width: 300,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <ActionsMenu saleFactorConfirmation={params.row} reloadInvoice={refetch} />
        ),
      },
      {
        field: 'factorNumber',
        headerName: 'شماره فاکتور',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 150,
      },
      {
        field: 'saleType',
        headerName: 'الگوی صورتحساب',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 150,
        valueGetter: (params) => (params.value === 0 ? 'فروش' : params.value === 1 ? 'صادرات' : ''),
      },
      {
        field: 'dateFactorSale',
        headerName: 'تاریخ صدور صورتحساب',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 180,
        valueGetter: (params) => {
          const gregorianDate = params.value;
          const solarDate = moment(gregorianDate).format('jYYYY/jMM/jDD');
          return solarDate;
        },
      },
      {
        field: 'name',
        headerName: 'نام طرف حساب',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 200,
        valueGetter: (params: GridRenderCellParams<any>) => {
          if (params.row.pepoleGrouping && params.row.pepoleGrouping.pepole) {
            return params.row.pepoleGrouping.pepole?.name || '-----';
          }
          return '-----';
        },
      },
      {
        field: 'nationalityCode',
        headerName: 'شناسه ملی',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        width: 150,
        valueGetter: (params) => {
          if (
            params.row.pepoleGrouping &&
            params.row.pepoleGrouping.pepole &&
            params.row.pepoleGrouping.pepole &&
            params.row.pepoleGrouping.pepole.pepoleDescription
          ) {
            return params.row.pepoleGrouping.pepole.pepoleDescription.nationalityCode || '-----';
          } else {
            return '-----';
          }
        },
      },
    ],
    [refetch]
  );

  const handlePageChange = (paginationModel: GridPaginationModel) => {
    setPage(paginationModel.page);
    setPageSize(paginationModel.pageSize);
  };

  const handleSorts = (sortModel: GridSortModel) => {
    setSort({
      order: sortModel[0]?.sort || 'desc',
      order_by: sortModel[0]?.field || 'id',
    });
  };

  if (isLoading) {
    return <Loading />;
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
        rows={rowsWithLocalId}
        getRowId={(row) => row.id} // Use actual id for internal row operations
        rowCount={data?.data.totalRows || 0}
        sortingMode="server"
        filterMode="server"
        // onFilterModelChange={handleFilter}
        onSortModelChange={handleSorts}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        onPaginationModelChange={handlePageChange}
      />
    </Card>
  );
}
