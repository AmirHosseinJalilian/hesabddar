/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QuerySaleFactorConfirmationsResponseType, SaleFactorConfirmationQueryFiltersType } from 'src/@types/sale_factor_confirmation/querySaleFactorConfirmationData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QuerySaleFactorConfirmationID } from 'src/_requests/sale_factor_confirmation';

type querySaleFactorConfirmationsType = {
  id?: any;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: SaleFactorConfirmationQueryFiltersType;
};

export function useSaleFactorConfirmationIDQuery(
  queryFnArgs: querySaleFactorConfirmationsType,
  options?: UseQueryOptions<QuerySaleFactorConfirmationsResponseType, ErrorResponse>
) {
  const queryKey = ['querySaleFactorConfirmationIDQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QuerySaleFactorConfirmationsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QuerySaleFactorConfirmationsResponseType> =>
      QuerySaleFactorConfirmationID(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as SaleFactorConfirmationQueryFiltersType)
      ),
    options
  );
}
