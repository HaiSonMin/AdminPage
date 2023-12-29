const lodash = require('lodash');
import { Response } from 'express';
import otpGenerator from 'otp-generator';
import JWT from 'jsonwebtoken';
import { ITokenVerify } from '../interface';
import { SortOrder } from 'mongoose';

export const verifyToken = (token: string, key: string): ITokenVerify | null =>
  JWT.verify(token, key) as ITokenVerify;

export const getInfoData = (object: any, field: Array<string>) =>
  lodash.pick(object, field);

export const saveTokenCookie = ({
  tokenName,
  tokenValue,
  day,
  res,
}: {
  tokenName: string;
  tokenValue: any;
  day: number;
  res: Response;
}) =>
  res.cookie(tokenName, tokenValue, {
    httpOnly: true,
    maxAge: day * 24 * 60 * 60 * 1000,
  });

export const deleteTokenCookie = (tokenName: string, res: Response) =>
  res.clearCookie(tokenName, {
    httpOnly: true,
  });

export const getMiliSecondFormSecond = (second: number) => second * 1000;

export const generatorOTP = async () =>
  otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

export const generatorUsername = (fullName: string): string => {
  const itemsName = fullName.split(' ');
  const mainName = itemsName[itemsName.length - 1].toLowerCase();
  const subName = itemsName
    .slice(0, -1)
    .map((item) => item.toLowerCase().slice(0, 1))
    .join('');
  return (mainName + subName).toString();
};

export const latinizeStr = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const generateRandomNumber = () => Math.floor(Math.random() * 1000);

export const sortBy = (sort: string = 'ctime'): { [key: string]: SortOrder } =>
  Object.fromEntries(
    sort.split(',').map((elSort) => {
      if (elSort === 'ctime') return ['createdAt', 'asc'];
      else return [elSort.split('-')[0], elSort.split('-')[1] as SortOrder];
    })
  );

export const filterBy = (filter: string = ''): { [key: string]: string } =>
  Object.fromEntries(
    filter
      .split(',')
      .map((elFilter) => [elFilter.split('-')[0], elFilter.split('-')[1]])
  );

export const selectFields = (fields: string) => {
  if (!fields) return '';
  return fields.split(',').map((field) => field.trim());
};

export const convertOperatorObject = (
  fields: string[] = [],
  numericFilters = ''
) => {
  const queryObject: Record<string, { [key: string]: number }> = {};

  const operatorMap: Record<string, string> = {
    '[gt]': '$gt',
    '[gte]': '$gte',
    '[lt]': '$lt',
    '[lte]': '$lte',
    '[eq]': '$eq',
  };

  const regEx = /\b(\[gt\]|\[gte\]|\[lt\]|\[lte\]|\[eq\])\b/g;
  let filterOperator = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[`${match}`]}-`
  );

  filterOperator.split(',').forEach((item) => {
    const [field, operator, value] = item.split('-');

    // Check if the field is in the fields array
    if (fields.includes(field)) {
      // Ensure that the field is initialized in queryObject
      if (!queryObject[field]) {
        queryObject[field] = {};
      }
      // Update the operator and value in queryObject
      queryObject[field][operator] = +value;
    }
  });

  return queryObject;
};

export const skipPage = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): number => (+page - 1) * +limit;
