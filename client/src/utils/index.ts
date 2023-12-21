import { useQueriesString } from '@/hooks';
import { IError, IQuery } from '@/interfaces/common';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const randomKey = (): string => uuidv4();

export const maskEmail = (email: string, isDisplay?: boolean) => {
  if (isDisplay) return email;
  const atIndex = email.indexOf('@');
  if (atIndex > 1) {
    const maskedPart = email.slice(2, atIndex).replace(/./g, '*');
    return email.slice(0, 2) + maskedPart + email.slice(atIndex);
  }
  return email;
};

export const formatCurrencyVND = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);

export const convertToStringToken = (token: string) => `Bearer ${token}`;

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhoneNumber = (phoneNumber: string) =>
  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phoneNumber);

export const getMaxItems = (): number => 10e9;

export const calculatePagination = (
  totalItems: number,
  numberDisplayOnPage: number,
  currentPage: number
) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / numberDisplayOnPage);

  // Validate current page to ensure it's within the valid range
  currentPage = Math.min(Math.max(1, currentPage), totalPages);

  return {
    totalItems: totalItems,
    totalPages: totalPages,
    currentPage: currentPage,
    numberDisplayOnPage: numberDisplayOnPage,
  };
};

export const formatDateHour = (date: Date) =>
  format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
export const formatDate = (date: Date) => format(new Date(date), 'dd/MM/yyyy');

export const getQueries = (queryString: Partial<IQuery>): Partial<IQuery> => {
  const sort: string | undefined = queryString.sort;
  const page: number = Number(queryString.page) || 1;
  const limit: number = queryString.limit || 10;
  const search: string | undefined = queryString.search;
  const filters: string | undefined = queryString.filters;
  const numericFilters: string | undefined = queryString.numericFilters;
  return { sort, page, limit, search, filters, numericFilters };
};

export * from './http';
