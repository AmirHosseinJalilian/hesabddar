// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateSaleFactorTaxRequestBodyType,
  CreateSaleFactorTaxResponseType,
} from 'src/@types/sale_factor_tax/createSaleFactorTaxData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CreateSaleFactorTax from 'src/_requests/sale_factor_tax/createSaleFactorTax';

export function useCreateSaleFactorTaxMutation(
  options?: UseMutationOptions<
    CreateSaleFactorTaxResponseType,
    ErrorResponse,
    CreateSaleFactorTaxRequestBodyType
  >
) {
  return useMutation<
    CreateSaleFactorTaxResponseType,
    ErrorResponse,
    CreateSaleFactorTaxRequestBodyType
  >((data: CreateSaleFactorTaxRequestBodyType) => CreateSaleFactorTax(data), options);
}
