import toast from 'react-hot-toast';
import { WebApi } from '@/apis/Web.api';
import { IApi, IError, IQuery } from '@/interfaces/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IWebResultApiCreate,
  IWebResultApiDelete,
  IWebResultApiGet,
  IWebResultApiGetAll,
  IWebResultApiSearch,
  IWebResultApiUpdate,
} from '@/interfaces/result-apis/web';
import { IWeb } from '@/interfaces/models';
export const useWebApiCreate = (): IWebResultApiCreate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isCreatingWeb,
  } = useMutation({
    mutationFn: WebApi.create,
    onSuccess: (data: IApi<IWeb>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['webs'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    createWeb: mutate,
    isCreatingWeb,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useWebApiGetById = (webId: string): IWebResultApiGet => {
  const { data, isPending: isGettingWeb } = useQuery({
    queryKey: ['web', webId],
    queryFn: () => WebApi.getById(webId),
  });

  return {
    isGettingWeb,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useWebApiGetAll = (
  query: Partial<IQuery>
): IWebResultApiGetAll => {
  const queryClient = useQueryClient();
  const { data, isPending: isGettingWebs } = useQuery({
    queryKey: ['webs', query],
    queryFn: () => WebApi.getAll(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;
  console.log('data?.metadata?.totalWebs:::', data?.metadata?.totalItems);
  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  console.log('currentPage, totalPages:::', { currentPage, totalPages });
  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['webs', { ...query, page: currentPage + 1 }],
      queryFn: () => WebApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['webs', { ...query, page: currentPage - 1 }],
      queryFn: () => WebApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isGettingWebs,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useWebApiSearch = (
  query: Partial<IQuery>
): IWebResultApiSearch => {
  const queryClient = useQueryClient();
  const { data, isPending: isSearchingWebs } = useQuery({
    queryKey: ['webs', query],
    queryFn: () => WebApi.search(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;
  console.log('data?.metadata?.totalWebs:::', data?.metadata?.totalItems);
  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  console.log('currentPage, totalPages:::', { currentPage, totalPages });
  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['webs', { ...query, page: currentPage + 1 }],
      queryFn: () => WebApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['webs', { ...query, page: currentPage - 1 }],
      queryFn: () => WebApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isSearchingWebs,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useWebApiUpdate = (): IWebResultApiUpdate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isUpdatingWeb,
  } = useMutation({
    mutationFn: WebApi.update,
    onSuccess: (data: IApi<IWeb>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['webs'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    updateWeb: mutate,
    isUpdatingWeb,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useWebApiDelete = (): IWebResultApiDelete => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isDeletingWeb,
  } = useMutation({
    mutationFn: WebApi.delete,
    onSuccess: (data: IApi<IWeb>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['webs'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    deleteWeb: mutate,
    isDeletingWeb,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};
