import { IQuery } from '@/interfaces/common/IQuery.interface';
import { useSearchParams } from 'react-router-dom';

export function useQueriesString(): Partial<IQuery> {
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries([...searchParams]);
  return searchParamsObject;
}
