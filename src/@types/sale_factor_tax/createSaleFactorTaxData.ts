import { SaleFactorTaxData } from './saleFactorTaxData';

export type CreateSaleFactorTaxRequestBodyType = {
  saleFactorConfirmationID: number | undefined;
  billType: number;
  postType: number;
  // creationDate: Date;
  settlementMethod: number;
  cashAmount: number;
  loanAmount: number;
};

export type CreateSaleFactorTaxResponseType = {
  statusCode: number;
  data: SaleFactorTaxData;
};
