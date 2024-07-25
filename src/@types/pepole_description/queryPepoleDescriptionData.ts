import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { PepoleDescriptionData } from './pepoleDescriptionData';

export type PepoleDescriptionQueryFiltersType = {
  id: FilterValueInt;
  pepoleID: FilterValueInt;
  address: FilterValueString;
  phone: FilterValueString;
  nationalityCode: FilterValueString;
};

export type QueryPepoleDescriptionResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: PepoleDescriptionData[];
  };
};
