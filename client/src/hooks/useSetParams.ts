import { EQuery } from '@/enums';
import { useSearchParams } from 'react-router-dom';

export function useSetParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = (name: EQuery, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return { setParams };
}
