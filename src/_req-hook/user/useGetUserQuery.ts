/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UserData } from 'src/@types/user/userData';
import GetUser from 'src/_requests/user/getUser';

type getUserType = {
  id: string;
  // filters: NursesQueryAbsencesFilterType;
};

export function useGetUserQuery(
  queryFnArgs: getUserType,
  options?: UseQueryOptions<UserData>
) {
  const queryKey = ['getUserQuery', JSON.stringify(queryFnArgs.id)];

  return useQuery<UserData>(
    queryKey,
    async (): Promise<UserData> => GetUser(queryFnArgs.id),
    options
  );
}
