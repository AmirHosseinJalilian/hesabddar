import { AxiosResponse } from 'axios';
import {
  CompanyQueryFiltersType,
  QueryCompanyResponseType,
} from 'src/@types/company/queryCompanyData';
import { moadian } from 'src/_clients';

export default async function QueryCompany(
  id: any,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: CompanyQueryFiltersType
): Promise<QueryCompanyResponseType> {
  const response = await moadian.get<void, AxiosResponse<QueryCompanyResponseType>>(
    '/api/Company/List',
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
