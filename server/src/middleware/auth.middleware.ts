import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
} from '../core/error.response';
import { TokenRepository, EmployeeRepository } from '../repositories';
import { deleteTokenCookie } from '../utils';
import { VALUE_CONSTANT } from '../constant';
import { ERole } from '../enum';
import { ITokenVerify } from '../interface';
import { env } from 'process';

export const checkApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== env['X-API-KEY']) {
    throw new BadRequestError('Not ok');
  }
  next();
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new UnauthenticatedError('Invalid credential AT');

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new UnauthenticatedError('Vui lòng đăng nhập lại');

  const tokenStore = await TokenRepository.getRefreshTokenUsing(refreshToken);

  if (!tokenStore) throw new ForbiddenError('Vui lòng đăng nhập lại');
  // Verify AT
  try {
    const payload: ITokenVerify = JWT.verify(
      accessToken.split(' ')[1].trim(),
      tokenStore.token_publicKey
    ) as ITokenVerify;
    req.app.locals.employee = payload;
  } catch (error) {
    throw new UnauthenticatedError('AT hết hạn, refresh lại token mau lên');
  }

  // Verify RT
  try {
    JWT.verify(refreshToken, tokenStore.token_publicKey);
  } catch (error) {
    await TokenRepository.deleteByRefreshToken(refreshToken);
    deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
    throw new ForbiddenError('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
  }

  next();
};

export const checkAuthIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new UnauthenticatedError('Invalid credential AT');

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new ForbiddenError('Vui lòng đăng nhập lại');

  const tokenStore = await TokenRepository.getRefreshTokenUsing(refreshToken);
  if (!tokenStore) throw new ForbiddenError('Vui lòng đăng nhập lại');

  // Verify AT
  try {
    const payload: any = JWT.verify(
      accessToken.split(' ')[1].trim(),
      tokenStore.token_publicKey
    );
    req.app.locals.employee = payload;
  } catch (error) {
    throw new UnauthenticatedError('AT hết hạn, refresh lại token mau lên!');
  }

  // Verify RT
  try {
    // await AuthService.refreshAccessToken(req, res);
    JWT.verify(refreshToken, tokenStore.token_publicKey);
  } catch (error) {
    await TokenRepository.deleteByRefreshToken(refreshToken);
    deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
    throw new ForbiddenError('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
  }

  const { employeeEmail } = req.app.locals.employee;
  const employee = await EmployeeRepository.getByEmail(employeeEmail);

  if (!employee || employee.employee_role !== ERole.ADMIN)
    throw new ForbiddenError('Không có quyền ADMIN');

  next();
};
