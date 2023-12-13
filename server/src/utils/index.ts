const lodash = require('lodash');
import { Response } from 'express';
import otpGenerator from 'otp-generator';
import JWT from 'jsonwebtoken';
import { ITokenVerify } from '../interface';

const verifyToken = (token: string, key: string): ITokenVerify | null =>
  JWT.verify(token, key) as ITokenVerify;

const getInfoData = (object: any, field: Array<string>) =>
  lodash.pick(object, field);

const saveTokenCookie = ({
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

const deleteTokenCookie = (tokenName: string, res: Response) =>
  res.clearCookie(tokenName, {
    httpOnly: true,
  });

const getMiliSecondFormSecond = (second: number) => second * 1000;

const generatorOTP = async () =>
  otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

const generatorUsername = (fullName: string): string => {
  const itemsName = fullName.split(' ');
  const mainName = itemsName[itemsName.length - 1].toLowerCase();
  const subName = itemsName
    .slice(0, -1)
    .map((item) => item.toLowerCase().slice(0, 1))
    .join('');
  return (mainName + subName).toString();
};

const latinizeStr = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const skipPage = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): number => (+page - 1) * +limit;

export {
  skipPage,
  verifyToken,
  getInfoData,
  generatorOTP,
  latinizeStr,
  saveTokenCookie,
  generatorUsername,
  deleteTokenCookie,
  getMiliSecondFormSecond,
};
