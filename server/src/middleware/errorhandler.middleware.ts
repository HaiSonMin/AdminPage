import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
``;
import logging from '../helper/logging';

const errorHandlerMiddleware = function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Some thing went wrong, please try again',
    reasonStatusCode: err.reasonStatusCode || 'Error',
  };

  // Duplicate Error
  if (err.code || err.code === 11000) {
    const fieldDuplicate = Object.keys(err.keyValue)[0];
    customError.message = `Dữ liệu trường ${fieldDuplicate} đã tồn tại giá trị: {${err.keyValue[fieldDuplicate]}}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handler field required
  if (err.name === 'ValidationError') {
    // Start handle error at the first error
    const fieldError = Object.keys(err.errors)[0];
    customError.message = err.errors[fieldError].message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Enter excess or missing id when we wanna getting one object(ID not valid)
  if (err.name === 'CastError') {
    customError.message = `Không tìm thấy item với Id:${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  let userInfo: any;
  if (req.app.locals.user) userInfo = req.app.locals.user;
  logging({
    message: customError.message,
    method: req.method,
    url: req.url,
    ...userInfo,
  });

  return res.status(customError.statusCode).json({
    status: customError.statusCode,
    error: customError.reasonStatusCode,
    message: customError.message,
  });
};

export default errorHandlerMiddleware;
