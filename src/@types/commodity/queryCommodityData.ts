import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { CommodityData } from './commodityData';

export type CommodityQueryFiltersType = {
  id?: FilterValueInt;
  comodityCod: FilterValueString;
  commodityName: FilterValueString;
  unitCount: FilterValueInt;
  basePrice: FilterValueInt;
};

export type QueryCommodityResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: CommodityData[];
  };
};
