import { PepoleDescriptionData } from './pepoleDescriptionData';

export type CreatePepoleDescriptionRequestBodyType = {
  id: number;
  pepoleID: number;
  address: string;
  phone: string;
  nationalityCode: string;
  //   user: UserData;
};

export type CreatePepoleDescriptionResponseType = {
  statusCode: number;
  data: PepoleDescriptionData;
};
