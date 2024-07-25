/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SignInRequestType, SignInResponseType } from 'src/@types/auth_identity/LoginIdentity';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import LoginIdentity from 'src/_requests/auth/loginIdentity';

export function useSignInMutation(
  options?: UseMutationOptions<SignInResponseType, ErrorResponse, SignInRequestType>
) {
  return useMutation<SignInResponseType, ErrorResponse, SignInRequestType>(
    async (data: SignInRequestType): Promise<SignInResponseType> => LoginIdentity(data),
    options
  );
}