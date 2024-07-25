import { AxiosResponse } from 'axios';
import {
  CreateAddInvoiceRequestBodyType,
  CreateAddInvoiceResponseType,
} from 'src/@types/add_invoice/createAddInvoiceData';
import { moadian } from 'src/_clients';

export default async function CreateAddInvoice(
  addInvoice: CreateAddInvoiceRequestBodyType
): Promise<CreateAddInvoiceResponseType> {
  const response = await moadian.post<
    CreateAddInvoiceRequestBodyType,
    AxiosResponse<CreateAddInvoiceResponseType>
  >(`/api/Tax/AddInvoice`, addInvoice);

  return response.data;
}
