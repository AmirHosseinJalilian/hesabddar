import { GroupingData } from './groupingData';
import { SaleFactorConfirmationDetailsData } from '../sale_factor_confirmation_details/saleFactorConfirmationDetailsData';
import { CreatePepoleRequestBodyType } from '../pepoles/createPepoleData';

export type CreateGroupingRequestBodyType = {
  id: number;
  objectValue: string;
  pepole: CreatePepoleRequestBodyType[];
};

export type CreateGroupingResponseType = {
  statusCode: number;
  data: GroupingData;
};
