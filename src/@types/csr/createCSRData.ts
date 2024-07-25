import { CSRData } from './CSRData';

export type CreateCSRRequestBodyType = {
  saleFactorConfirmationID: number;
  billType: number;
  postType: number;
  creationDate: Date;
  settlementMethod: number;
  cashAmount: number;
  loanAmount: number;
};

export type CreateCSRTaxResponseType = {
  statusCode: number;
  data: CSRData;
};
