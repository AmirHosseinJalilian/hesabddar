import { AxiosResponse } from 'axios';
import {
  CreateSaleFactorTaxRequestBodyType,
  CreateSaleFactorTaxResponseType,
} from 'src/@types/sale_factor_tax/createSaleFactorTaxData';
import { hesab } from 'src/_clients';

export default async function CreateSaleFactorTax(
  tax: CreateSaleFactorTaxRequestBodyType
): Promise<CreateSaleFactorTaxResponseType> {
  const response = await hesab.post<
    CreateSaleFactorTaxRequestBodyType,
    AxiosResponse<CreateSaleFactorTaxResponseType>
  >(`/api/saleFactorTaxes`, tax);

  return response.data;
}
