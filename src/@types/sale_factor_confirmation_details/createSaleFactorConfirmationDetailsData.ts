import { CreateCommodityRequestBodyType } from '../commodity/createCommodityData';
import { SaleFactorConfirmationDetailsData } from './saleFactorConfirmationDetailsData';

export type CreateSaleFactorConfirmationDetailsRequestBodyType = {
  count: number;
  unitCost: number;
  commodityDiscount: number;
  iSCommodityDiscount: boolean;
  vat: number;
  commodityID: number;
  commodity: CreateCommodityRequestBodyType[];
};

export type CreateSaleFactorConfirmationDetailsResponseType = {
  statusCode: number;
  data: SaleFactorConfirmationDetailsData;
};
