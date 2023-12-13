import { IError } from '@/interfaces/common';
import { v4 as uuidv4 } from 'uuid';

export const randomKey = (): string => uuidv4();

export const getErrorRes = (error: any): IError => error.response.data;

export const maskEmail = (email: string, isDisplay?: boolean) => {
  if (isDisplay) return email;
  const atIndex = email.indexOf('@');
  if (atIndex > 1) {
    const maskedPart = email.slice(2, atIndex).replace(/./g, '*');
    return email.slice(0, 2) + maskedPart + email.slice(atIndex);
  }
  return email;
};

export const convertToStringToken = (token: string) => `Bearer ${token}`;

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
export const validatePhoneNumber = (phoneNumber: string) =>
  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phoneNumber);

export * from './http';
