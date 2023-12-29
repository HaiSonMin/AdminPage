import toast from 'react-hot-toast';
import { VoucherApi } from '@/apis/Voucher.api';
import { useSearchParams } from 'react-router-dom';
import { IApi, IError, IQuery } from '@/interfaces/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IVoucherResultApiCreate,
  IVoucherResultApiDelete,
  IVoucherResultApiGet,
  IVoucherResultApiGetAll,
  IVoucherResultApiSearch,
  IVoucherResultApiUpdate,
} from '@/interfaces/result-apis/voucher';
import { useQueriesString } from '@/hooks';
import { getQueries } from '@/utils';
import { IVoucher } from '@/interfaces/models';

export const useVoucherApiCreate = (): IVoucherResultApiCreate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isCreatingVoucher,
  } = useMutation({
    mutationFn: VoucherApi.create,
    onSuccess: (data: IApi<IVoucher>) => {
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    createVoucher: mutate,
    isCreatingVoucher,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useVoucherApiGetById = (
  voucherId: string
): IVoucherResultApiGet => {
  const { data, isPending: isGettingVoucher } = useQuery({
    queryKey: ['voucher', voucherId],
    queryFn: () => VoucherApi.getById(voucherId),
  });

  return {
    isGettingVoucher,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useVoucherApiGetAll = (
  query: Partial<IQuery>
): IVoucherResultApiGetAll => {
  const queryClient = useQueryClient();
  const { data, isPending: isGettingVouchers } = useQuery({
    queryKey: ['vouchers', query],
    queryFn: () => VoucherApi.getAll(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;

  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['vouchers', { ...query, page: currentPage + 1 }],
      queryFn: () => VoucherApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['vouchers', { ...query, page: currentPage - 1 }],
      queryFn: () => VoucherApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isGettingVouchers,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useVoucherApiSearch = (
  query: Partial<IQuery>
): IVoucherResultApiSearch => {
  const queryClient = useQueryClient();
  const { data, isPending: isSearchingVouchers } = useQuery({
    queryKey: ['vouchers', query],
    queryFn: () => VoucherApi.search(query),
  });

  let totalPages: number = 1;
  const currentPage: number = query?.page || 1;

  if (data?.metadata?.totalItems)
    totalPages = Math.ceil(data?.metadata?.totalItems / 10);

  // Get Data Next Page
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['vouchers', { ...query, page: currentPage + 1 }],
      queryFn: () => VoucherApi.getAll({ ...query, page: currentPage + 1 }),
    });

  // Get Data Next Page
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['vouchers', { ...query, page: currentPage - 1 }],
      queryFn: () => VoucherApi.getAll({ ...query, page: currentPage - 1 }),
    });

  return {
    isSearchingVouchers,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useVoucherApiUpdate = (): IVoucherResultApiUpdate => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isUpdatingVoucher,
  } = useMutation({
    mutationFn: VoucherApi.update,
    onSuccess: (data: IApi<IVoucher>) => {
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    updateVoucher: mutate,
    isUpdatingVoucher,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};

export const useVoucherApiDelete = (): IVoucherResultApiDelete => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate,
    isPending: isDeletingVoucher,
  } = useMutation({
    mutationFn: VoucherApi.delete,
    onSuccess: (data: IApi<IVoucher>) => {
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return {
    deleteVoucher: mutate,
    isDeletingVoucher,
    message: data?.message,
    metadata: data?.metadata,
    statusCode: data?.statusCode,
    reasonStatusCode: data?.reasonStatusCode,
  };
};
