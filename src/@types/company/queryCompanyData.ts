import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { CompanyData } from './companyData';

export type CompanyQueryFiltersType = {
  dateFactorSaleFrom?: FilterValueString; // ISO date string
  dateFactorSaleTo?: FilterValueString; // ISO date string
  factorNumber?: FilterValueString;
  saleType?: FilterValueInt;
  pepoleGroupingID?: FilterValueInt;
};

export type QueryCompanyResponseType = {
  message: null;
  isSuccess: true;
  data: CompanyData[];

  // limit: number;
  // offset: number;
  // page: number;
  // totalRows: number;
  // totalPages: number;
};
