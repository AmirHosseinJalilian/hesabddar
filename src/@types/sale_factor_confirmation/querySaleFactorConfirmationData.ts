import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { SaleFactorConfirmationData } from './saleFactorConfirmationData';

export type SaleFactorConfirmationQueryFiltersType = {
  dateFactorSaleFrom?: FilterValueString; // ISO date string
  dateFactorSaleTo?: FilterValueString; // ISO date string
  factorNumber?: FilterValueString;
  saleType?: FilterValueInt;
  pepoleGroupingID?: FilterValueInt;
};

export type QuerySaleFactorConfirmationsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: SaleFactorConfirmationData[];
  };
};
