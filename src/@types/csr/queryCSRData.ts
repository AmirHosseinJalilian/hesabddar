import { FilterValueBool, FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { CSRData } from './CSRData';

export type CSRQueryFiltersType = {
  saleFactorConfirmationTID: FilterValueInt;
  billType: FilterValueInt;
  postType: FilterValueInt;
  creationDate: FilterValueString;
  settlementMethod: FilterValueInt;
  cashAmount: FilterValueInt;
  loanAmount: FilterValueInt;
};

export type QueryCSRResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: CSRData[];
  };
};
