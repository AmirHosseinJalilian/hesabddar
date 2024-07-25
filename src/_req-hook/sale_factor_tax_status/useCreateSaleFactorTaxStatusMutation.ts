// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateSaleFactorTaxStatusRequestBodyType,
  CreateSaleFactorTaxStatusResponseType,
} from 'src/@types/sale_factor_tax_status/createSaleFactorTaxStatusData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CreateSaleFactorTaxStatus from 'src/_requests/sale_factor_tax_status/createSaleFactorTaxStatus';

export function useCreateSaleFactorTaxStatusMutation(
  options?: UseMutationOptions<
    CreateSaleFactorTaxStatusResponseType,
    ErrorResponse,
    CreateSaleFactorTaxStatusRequestBodyType
  >
) {
  return useMutation<
    CreateSaleFactorTaxStatusResponseType,
    ErrorResponse,
    CreateSaleFactorTaxStatusRequestBodyType
  >((data: CreateSaleFactorTaxStatusRequestBodyType) => CreateSaleFactorTaxStatus(data), options);
}
