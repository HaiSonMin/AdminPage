import toast from 'react-hot-toast';
import { CustomerApi } from '@/apis/Customer.api';
import { IApi, IError, IQuery } from '@/interfaces/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ICustomerResultApiCreate,
  ICustomerResultApiDelete,
  ICustomerResultApiGetAll,
  ICustomerResultApiGetById,
  ICustomerResultApiSearch,
  ICustomerResultApiUpdate,
} from '@/interfaces/result-apis/customer';
import { ICustomer } from '@/interfaces/models';

export const useCustomerApiCreate = (): ICustomerResultApiCreate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isCreatingCustomer,
  } = useMutation({
    mutationFn: CustomerApi.create,
    onSuccess: (data: IApi<ICustomer>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    createCustomer: mutate,
    isCreatingCustomer,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useCustomerApiGetById = (
  customerId: string
): ICustomerResultApiGetById => {
  const { data, isLoading: isGettingCustomer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => CustomerApi.getById(customerId),
  });
  return {
    isGettingCustomer,
    metadata: data?.metadata,
    message: data?.message,
    reasonStatusCode: data?.reasonStatusCode,
    statusCode: data?.statusCode,
  };
};

export const useCustomerApiGetAll = (
  query: Partial<IQuery>
): ICustomerResultApiGetAll => {
  const queryClient = useQueryClient();
  const { data, isLoading: isGettingCustomers } = useQuery({
    queryKey: ['customers', query],
    queryFn: () => CustomerApi.getAll(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;
  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['customers', { ...query, page: currentPage + 1 }],
      queryFn: () => CustomerApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['customers', { ...query, page: currentPage - 1 }],
      queryFn: () => CustomerApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isGettingCustomers,
    metadata: data?.metadata,
    message: data?.message,
    reasonStatusCode: data?.reasonStatusCode,
    statusCode: data?.statusCode,
  };
};

export const useCustomerApiSearch = (
  query: Partial<IQuery>
): ICustomerResultApiSearch => {
  const queryClient = useQueryClient();
  const { data, isLoading: isSearchingCustomers } = useQuery({
    queryKey: ['customers', query],
    queryFn: () => CustomerApi.search(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;
  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['customers', { ...query, page: currentPage + 1 }],
      queryFn: () => CustomerApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['customers', { ...query, page: currentPage - 1 }],
      queryFn: () => CustomerApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isSearchingCustomers,
    metadata: data?.metadata,
    message: data?.message,
    reasonStatusCode: data?.reasonStatusCode,
    statusCode: data?.statusCode,
  };
};

export const useCustomerApiUpdate = (): ICustomerResultApiUpdate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isUpdatingCustomer,
  } = useMutation({
    mutationFn: CustomerApi.update,
    onSuccess: (data: IApi<ICustomer>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    updateCustomer: mutate,
    isUpdatingCustomer,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useCustomerApiDelete = (): ICustomerResultApiDelete => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isDeletingCustomer,
  } = useMutation({
    mutationFn: CustomerApi.delete,
    onSuccess: (data: IApi<ICustomer>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });
  return {
    deleteCustomer: mutate,
    isDeletingCustomer,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};
