import { SaleFactorTaxStatusData } from './saleFactorTaxStatusData';

export type CreateSaleFactorTaxStatusRequestBodyType = {
  saleFactorConfirmationTSID: number;
  status: number;
  statusDate: string;
};

export type CreateSaleFactorTaxStatusResponseType = {
  statusCode: number;
  data: SaleFactorTaxStatusData;
};
