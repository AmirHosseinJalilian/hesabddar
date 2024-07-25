import { CommodityData } from '../commodity/commodityData';

export type SaleFactorConfirmationDetailsData = {
  id: number;
  saleFactorConfirmationID: number;
  count: number;
  unitCost: number;
  commodityDiscount: number;
  iSCommodityDiscount: boolean;
  vat: number;
  commodityID: number;
  commodity: CommodityData;
};
