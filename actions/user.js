
import useSWR from 'swr';
import { fetcher } from '@/actions';

export const useGetUser = () => {
  // console.log("actions user js about to call useSWR('/api/v1/me', fetcher)");
  
  const {data, error, ...rest} = useSWR('/api/v1/me', fetcher);
  return {data, error, loading: !data && !error, ...rest};

}
