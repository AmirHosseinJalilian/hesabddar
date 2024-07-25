/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CompanyQueryFiltersType, QueryCompanyResponseType } from 'src/@types/company/queryCompanyData';
import {
  QuerySaleFactorConfirmationsResponseType,
  SaleFactorConfirmationQueryFiltersType,
} from 'src/@types/sale_factor_confirmation/querySaleFactorConfirmationData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryCompany } from 'src/_requests/company';
import { QuerySaleFactorConfirmations } from 'src/_requests/sale_factor_confirmation';

type querySaleFactorConfirmationsType = {
  id?: any;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: CompanyQueryFiltersType;
};

export function useCompanyQuery(
  queryFnArgs: querySaleFactorConfirmationsType,
  options?: UseQueryOptions<QueryCompanyResponseType, ErrorResponse>
) {
  const queryKey = ['queryCompanyQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryCompanyResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryCompanyResponseType> =>
      QueryCompany(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as CompanyQueryFiltersType)
      ),
    options
  );
}
