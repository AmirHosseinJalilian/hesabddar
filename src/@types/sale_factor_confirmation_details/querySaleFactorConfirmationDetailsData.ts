import { FilterValueInt, FilterValueString } from '../site/filters';
import { SaleFactorConfirmationDetailsData } from './saleFactorConfirmationDetailsData';

export type SaleFactorConfirmationDetailsQueryFiltersType = {
  id?: FilterValueInt;
  saleFactorConfirmationID?: FilterValueInt;
  count?: FilterValueInt;
  unitCost?: FilterValueInt;
  commodityDiscount?: FilterValueString;
  vat?: FilterValueString;
  commodityID?: FilterValueInt;
};

export type QuerySaleFactorConfirmationDetailsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: SaleFactorConfirmationDetailsData[];
  };
};
