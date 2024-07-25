import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { SaleFactorTaxStatusData } from './saleFactorTaxStatusData';

export type SaleFactorTaxStatusQueryFiltersType = {
  saleFactorConfirmationTSID: FilterValueInt;
  status: FilterValueInt;
  statusDate: FilterValueString;
};

export type QuerySaleFactorTaxStatusResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: SaleFactorTaxStatusData[];
  };
};
