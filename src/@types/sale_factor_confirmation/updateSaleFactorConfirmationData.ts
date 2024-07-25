import { SaleFactorConfirmationData } from './saleFactorConfirmationData';

export type UpdateSaleFactorConfirmationRequestBodyType = {
  invoice: {
    title: string;
    icon_url: string;
    grade: number;
    color: string;
  };
  ID?: number;
};

export type UpdateSaleFactorConfirmationResponseType = {
  statusCode: number;
  data: SaleFactorConfirmationData;
};
