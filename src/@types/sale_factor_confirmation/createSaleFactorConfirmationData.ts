import { CreateGroupingRequestBodyType } from '../grouping/createGroupingData';
import { GroupingData } from '../grouping/groupingData';
import { CreateSaleFactorConfirmationDetailsRequestBodyType } from '../sale_factor_confirmation_details/createSaleFactorConfirmationDetailsData';
import { SaleFactorConfirmationDetailsData } from '../sale_factor_confirmation_details/saleFactorConfirmationDetailsData';
import { SaleFactorTaxData } from '../sale_factor_tax/saleFactorTaxData';
import { SaleFactorTaxStatusData } from '../sale_factor_tax_status/saleFactorTaxStatusData';
import { SaleFactorConfirmationData } from './saleFactorConfirmationData';

export type CreateSaleFactorConfirmationRequestBodyType = {
  factorNumber: string;
  saleType: number;
  details: SaleFactorConfirmationDetailsData[];
  pepoleGrouping: GroupingData[];
  saleFactorTax: SaleFactorTaxData;
  saleFactorTaxStatus: SaleFactorTaxStatusData;
};

export type CreateSaleFactorConfirmationResponseType = {
  statusCode: number;
  data: SaleFactorConfirmationData;
};
