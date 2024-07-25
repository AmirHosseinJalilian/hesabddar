import { AxiosResponse } from 'axios';
import { UserData } from 'src/@types/user/userData';
import { moadian } from 'src/_clients';

export default async function GetUser(
  id: string
  // filter?: GetAllDocumentsFilterType
): Promise<UserData> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await moadian.get<void, AxiosResponse<UserData>>(
    `/api/Profile/Get`,
    {
      params: { id },
    }
  );

  return response.data;
}
