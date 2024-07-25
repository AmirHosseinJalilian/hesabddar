// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateAddInvoiceRequestBodyType,
  CreateAddInvoiceResponseType,
} from 'src/@types/add_invoice/createAddInvoiceData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CreateAddInvoice from 'src/_requests/add_invoice/createAddInvoice';

export function useCreateAddInvoiceMutation(
  options?: UseMutationOptions<
    CreateAddInvoiceResponseType,
    ErrorResponse,
    CreateAddInvoiceRequestBodyType
  >
) {
  return useMutation<CreateAddInvoiceResponseType, ErrorResponse, CreateAddInvoiceRequestBodyType>(
    (data: CreateAddInvoiceRequestBodyType) => CreateAddInvoice(data),
    options
  );
}
