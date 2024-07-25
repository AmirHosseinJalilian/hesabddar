import { CommodityData } from './commodityData';

export type CreateCommodityRequestBodyType = {
  comodityCod: string;
  commodityName: string;
  unitCount: number;
  basePrice: number;
};

export type CreateCommodityResponseType = {
  statusCode: number;
  data: CommodityData;
};
