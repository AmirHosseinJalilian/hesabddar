// import { UserData } from 'src/@types/vault/user/userData';

import { PepoleDescriptionData } from '../pepole_description/pepoleDescriptionData';

export type PepoleData = {
  id: number;
  name: string;
  pepoleType: number;
  codPepole: string;
  groupingID: number;
  pepoleDescription: PepoleDescriptionData;
};
