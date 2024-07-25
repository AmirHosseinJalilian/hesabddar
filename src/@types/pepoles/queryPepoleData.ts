import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { PepoleData } from './pepoleData';

export type PepoleQueryFiltersType = {
  id?: FilterValueInt;
  name?: FilterValueString;
  pepoleType?: FilterValueInt;
  codPepole?: FilterValueInt;
  groupingID?: FilterValueInt;
};

export type QueryPepoleResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: PepoleData[];
  };
};
