import { AxiosResponse } from 'axios';
import {
  CreateSaleFactorTaxStatusRequestBodyType,
  CreateSaleFactorTaxStatusResponseType,
} from 'src/@types/sale_factor_tax_status/createSaleFactorTaxStatusData';
import { hesab } from 'src/_clients';

export default async function CreateSaleFactorTaxStatus(
  taxStatus: CreateSaleFactorTaxStatusRequestBodyType
): Promise<CreateSaleFactorTaxStatusResponseType> {
  const response = await hesab.post<
    CreateSaleFactorTaxStatusRequestBodyType,
    AxiosResponse<CreateSaleFactorTaxStatusResponseType>
  >(`/api/CreateSaleFactorTaxStatus`, taxStatus);

  return response.data;
}
