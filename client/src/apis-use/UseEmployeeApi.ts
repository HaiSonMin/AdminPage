import toast from 'react-hot-toast';
import { EmployeeApi } from '@/apis/Employee.api';
import { IApi, IError, IQuery } from '@/interfaces/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IEmployeeResultApiCreate,
  IEmployeeResultApiDelete,
  IEmployeeResultApiGetAll,
  IEmployeeResultApiGetById,
  IEmployeeResultApiSearch,
  IEmployeeResultApiUpdate,
} from '@/interfaces/result-apis/employee';
import { IEmployee } from '@/interfaces/models';

export const useEmployeeApiCreate = (): IEmployeeResultApiCreate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isCreatingEmployee,
  } = useMutation({
    mutationFn: EmployeeApi.create,
    onSuccess: (data: IApi<IEmployee>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    createEmployee: mutate,
    isCreatingEmployee,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useEmployeeApiGetById = (
  employeeId: string
): IEmployeeResultApiGetById => {
  const { data, isLoading: isGettingEmployee } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => EmployeeApi.getById(employeeId),
  });
  return {
    isGettingEmployee,
    metadata: data?.metadata,
    message: data?.message,
    reasonStatusCode: data?.reasonStatusCode,
    statusCode: data?.statusCode,
  };
};

export const useEmployeeApiGetAll = (
  query: Partial<IQuery>
): IEmployeeResultApiGetAll => {
  const queryClient = useQueryClient();
  const { data, isLoading: isGettingEmployees } = useQuery({
    queryKey: ['employees', query],
    queryFn: () => EmployeeApi.getAll(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;
  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['employees', { ...query, page: currentPage + 1 }],
      queryFn: () => EmployeeApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['employees', { ...query, page: currentPage - 1 }],
      queryFn: () => EmployeeApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isGettingEmployees,
    metadata: data?.metadata,
    message: data?.message,
    reasonStatusCode: data?.reasonStatusCode,
    statusCode: data?.statusCode,
  };
};

export const useEmployeeApiSearch = (
  query: Partial<IQuery>
): IEmployeeResultApiSearch => {
  const queryClient = useQueryClient();
  const { data, isLoading: isSearchingEmployees } = useQuery({
    queryKey: ['employees', query],
    queryFn: () => EmployeeApi.search(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;
  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  console.log('currentPage, totalPages:::', { currentPage, totalPages });
  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['employees', { ...query, page: currentPage + 1 }],
      queryFn: () => EmployeeApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['employees', { ...query, page: currentPage - 1 }],
      queryFn: () => EmployeeApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isSearchingEmployees,
    metadata: data?.metadata,
    message: data?.message,
    reasonStatusCode: data?.reasonStatusCode,
    statusCode: data?.statusCode,
  };
};

export const useEmployeeApiUpdate = (): IEmployeeResultApiUpdate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isUpdatingEmployee,
  } = useMutation({
    mutationFn: EmployeeApi.update,
    onSuccess: (data: IApi<IEmployee>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });

  return {
    updateEmployee: mutate,
    isUpdatingEmployee,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useEmployeeApiDelete = (): IEmployeeResultApiDelete => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isDeletingEmployee,
  } = useMutation({
    mutationFn: EmployeeApi.delete,
    onSuccess: (data: IApi<IEmployee>) => {
      console.log('data::::', data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: IError) => {
      console.log('error::::', error);
      toast.error(error.message);
    },
  });
  return {
    deleteEmployee: mutate,
    isDeletingEmployee,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};
