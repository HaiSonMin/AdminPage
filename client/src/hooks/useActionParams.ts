import { EQuery } from '@/enums';
import { useSearchParams } from 'react-router-dom';

export function useActionParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = (name: EQuery, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const getParams = (name: EQuery) => {
    return searchParams.get(name);
  };

  const deleteParams = (name: EQuery) => {
    searchParams.delete(name);
    setSearchParams(searchParams);
  };

  return { getParams, setParams, deleteParams };
}
