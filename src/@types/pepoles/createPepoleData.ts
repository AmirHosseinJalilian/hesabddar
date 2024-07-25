import { CreatePepoleDescriptionRequestBodyType } from '../pepole_description/createPepoleDescriptionData';
import { PepoleData } from './pepoleData';

export type CreatePepoleRequestBodyType = {
  id: number;
  name: string;
  pepoleType: number;
  codPepole: string;
  groupingID: number;
  PepoleDescriptions: CreatePepoleDescriptionRequestBodyType[];
  //   user: UserData;
};

export type CreatePepoleResponseType = {
  statusCode: number;
  data: PepoleData;
};
