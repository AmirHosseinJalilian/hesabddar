import { FilterValueBool, FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { SaleFactorTaxData } from './saleFactorTaxData';

export type SaleFactorTaxQueryFiltersType = {
  saleFactorConfirmationTID: FilterValueInt;
  billType: FilterValueInt;
  postType: FilterValueInt;
  creationDate: FilterValueString;
  settlementMethod: FilterValueInt;
  cashAmount: FilterValueInt;
  loanAmount: FilterValueInt;
};

export type QuerySaleFactorTaxResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: SaleFactorTaxData[];
  };
};
