import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { GroupingData } from './groupingData';

export type GroupingQueryFiltersType = {
  id?: FilterValueInt;
  objectValue: FilterValueString;
};

export type QueryGroupingResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: GroupingData[];
  };
};
