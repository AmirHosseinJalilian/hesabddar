import { AxiosResponse } from 'axios';
import { SignInRequestType, SignInResponseType } from 'src/@types/auth_identity/LoginIdentity';
import moadian from 'src/_clients/moadian';

export default async function LoginIdentity(data: SignInRequestType): Promise<SignInResponseType> {
  const response = await moadian.post<void, AxiosResponse<SignInResponseType>>(
    '/api/Identity/SignIn',
    data
  );

  return response.data;
}
