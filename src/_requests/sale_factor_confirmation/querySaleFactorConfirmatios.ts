import { AxiosResponse } from 'axios';
import {
  QuerySaleFactorConfirmationsResponseType,
  SaleFactorConfirmationQueryFiltersType,
} from 'src/@types/sale_factor_confirmation/querySaleFactorConfirmationData';
import { hesab } from 'src/_clients';

export default async function QuerySaleFactorConfirmations(
  id: any,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: SaleFactorConfirmationQueryFiltersType
): Promise<QuerySaleFactorConfirmationsResponseType> {
  const response = await hesab.get<void, AxiosResponse<QuerySaleFactorConfirmationsResponseType>>(
    '/api/saleFactors',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
