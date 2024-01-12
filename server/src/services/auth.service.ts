import {
  getInfoData,
  verifyToken,
  generatorOTP,
  saveTokenCookie,
  deleteTokenCookie,
  getMiliSecondFormSecond,
} from '@/utils';
import {
  NotFoundError,
  BadRequestError,
  UnavailableError,
  ForbiddenError,
} from '@/core/error.response';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendMail } from '@/helper';
import { tokenModel } from '@/models';
import { Request, Response } from 'express';
import { VALUE_CONSTANT } from '@/constant';
import { ESession } from '@/enum/ESession.enum';
import { htmlResetPassword } from '@/constant/html';
import { IEmployee, IEmployeeDto } from '@/interface/model/employee';
import { TokenRepository, EmployeeRepository } from '@/repositories';
import { createDoubleKeys, createDoubleTokens } from '@/utils/token';
import {
  IAuthChangePass,
  IAuthLogin,
  ISessionLocal,
  ITokenVerify,
} from '@/interface';
export default class AuthService {
  static async login(dataLogin: IAuthLogin, res: Response) {
    console.log('dataLogin::::', dataLogin);
    const { employee_userName, employee_password } = dataLogin;
    let employee;
    if (employee_userName) {
      employee = await EmployeeRepository.getByUserName(employee_userName);
      if (!employee) throw new NotFoundError('Tên người dùng không tồn tại!');
    }

    const isMatchingPassword = await bcrypt.compare(
      employee_password,
      `${employee?.employee_password}`
    );

    if (!isMatchingPassword) throw new BadRequestError('Mật khẩu không đúng!');
    const {
      _id: employeeId,
      employee_email: employeeEmail,
      employee_role: employeeRole,
      employee_fullName: employeeFullName,
    } = employee as IEmployee;

    const { privateKey, publicKey } = createDoubleKeys();
    const keyStore = await tokenModel.findOneAndUpdate(
      {
        token_employee: employeeId,
      },
      {
        $set: {
          token_employee: employeeId,
          token_privateKey: privateKey,
          token_publicKey: publicKey,
        },
      },
      { new: true, upsert: true }
    );
    if (!keyStore) throw new BadRequestError('Lỗi hệ thống, vui lòng thử lại!');
    const publicKeyString = crypto.createPublicKey(
      keyStore.token_publicKey.toString()
    );
    // AT save to Author
    // RT save to DB and Cookie
    /////////////////////// Payload of token ///////////////////////
    const payload: ITokenVerify = {
      employeeId,
      employeeEmail,
      employeeRole,
      employeeFullName,
    };
    const { accessToken, refreshToken } = await createDoubleTokens({
      payload,
      privateKey,
      publicKey: publicKeyString,
    });
    await keyStore.updateOne({
      $set: {
        token_refreshTokenUsing: refreshToken,
      },
    });
    saveTokenCookie({
      tokenName: VALUE_CONSTANT.RT_NAME,
      tokenValue: refreshToken,
      day: 30,
      res,
    });
    return {
      employee: getInfoData(employee, [
        '_id',
        'employee_email',
        'employee_fullName',
        'employee_role',
      ]),
      accessToken,
    };
  }

  static async logout(req: Request, res: Response) {
    const refreshToken = req.cookies[VALUE_CONSTANT.RT_NAME];
    if (!refreshToken) throw new ForbiddenError('Vui lòng đăng nhập lại');
    deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
    // Delete RT in Db
    const keyDeleted = await TokenRepository.deleteByRefreshToken(refreshToken);
    if (!keyDeleted) throw new ForbiddenError('Vui lòng đăng nhập lại');
    return;
  }

  static async generateOTP(req: Request) {
    const TIME_EXPIRE_OTP = 120;
    const { sessionType } = req.app.locals;

    if (!req.app.locals.sessionData)
      throw new BadRequestError('Tạo OTP không thành công');
    const payload = req.app.locals.sessionData;

    if (sessionType + '' === ESession.RESET_PASSWORD) {
      const employeeExist = await EmployeeRepository.getByEmail(
        payload.employee_email
      );
      if (!employeeExist)
        throw new BadRequestError(
          `Email ${payload.user_email} không tồn tại trong hệ thống`
        );
    }

    req.app.locals.sessionOTP = await generatorOTP();
    req.app.locals.sessionDuration =
      Date.now() + getMiliSecondFormSecond(TIME_EXPIRE_OTP);
    req.app.locals.sessionConfirm = false;
    if (sessionType === ESession.RESET_PASSWORD)
      await sendMail(
        payload.employee_email,
        htmlResetPassword(req.app.locals.sessionOTP)
      );

    return `Vui lòng kiểm tra email đã điền trước đó`;
  }

  static async createSessionResetPassword(req: Request) {
    const { employee_email } = req.body as Pick<IEmployee, 'employee_email'>;
    const checkEmail = await EmployeeRepository.getByEmail(employee_email);
    if (!checkEmail)
      throw new BadRequestError(
        'Email người dùng không tồn tại trong hệ thống'
      );
    req.app.locals.sessionData = { employee_email };
    req.app.locals.sessionType = ESession.RESET_PASSWORD;

    return `Tạo phiên reset mật khẩu thành công`;
  }

  static async confirmOTP(req: Request) {
    const { OTPCode } = req.body;
    const { sessionOTP, sessionDuration, sessionType } = req.app.locals as Pick<
      ISessionLocal,
      'sessionOTP' | 'sessionDuration' | 'sessionType'
    >;
    if (`${OTPCode}` !== `${sessionOTP}`) {
      throw new BadRequestError(
        'Mã OTP không chính xác, vui lòng kiểm tra lại'
      );
    }

    if (sessionDuration < Date.now()) {
      throw new BadRequestError(
        'Mã OTP hết hạn, nhấn vào nút gửi lại để xác nhận mã khác'
      );
    }

    // Trường hợp của reset password
    if (sessionType === ESession.RESET_PASSWORD) {
      req.app.locals.sessionConfirm = true;
      req.app.locals.sessionOTP = null;
    }

    return `Xác nhận thành công`;
  }

  static async confirmResetPassword(req: Request) {
    if (!req.app.locals.sessionData || !req.app.locals.sessionConfirm)
      throw new BadRequestError('Có lỗi xảy ra, vui lòng thử lại');

    const { sessionData, sessionConfirm } = req.app.locals as Pick<
      ISessionLocal,
      'sessionData' | 'sessionConfirm'
    >;

    const { employee_password, employee_confirmPassword } = req.body as Pick<
      IEmployeeDto,
      'employee_password' | 'employee_confirmPassword'
    >;

    const { employee_email } = sessionData;
    if (!sessionConfirm) {
      throw new UnavailableError(
        'Không thể truy cập trang này khi chưa xác nhận OTP'
      );
    }

    if (employee_password !== employee_confirmPassword) {
      throw new BadRequestError('Mật khẩu xác nhận không khớp');
    }
    const employee = await EmployeeRepository.getByEmail(employee_email);

    if (!employee) throw new NotFoundError('Người dùng không tồn tại');

    const newPasswordEncode = await bcrypt.hash(
      employee_password,
      VALUE_CONSTANT.SALT_PASSWORD
    );
    await employee.updateOne({
      $set: { employee_password: newPasswordEncode },
    });
    req.app.locals.sessionOTP = null;
    req.app.locals.sessionDuration = null;
    req.app.locals.sessionType = null;
    req.app.locals.sessionData = null;
    req.app.locals.sessionConfirm = null;
    return 'Đổi mật khẩu thành công';
  }

  static async refreshAccessToken(req: Request, res: Response) {
    // Check cookie
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      throw new ForbiddenError(
        'Phiên bảng đăng nhập hết hạn, vui lòng đăng nhập lại'
      );
    // Check DB
    const keyStore = await TokenRepository.getRefreshTokenUsing(refreshToken);
    if (!keyStore) {
      await deleteTokenCookie(VALUE_CONSTANT.RT_NAME, res);
      throw new BadRequestError('Refresh token dost not exist');
    }
    // Verify RT
    const { token_publicKey, token_privateKey } = keyStore;
    let tokenVerify;
    try {
      tokenVerify = verifyToken(refreshToken, token_publicKey);
    } catch (error) {
      throw new ForbiddenError(
        'Phiên bảng đăng nhập hết hạn, vui lòng đăng nhập lại'
      );
    }

    const payload: ITokenVerify = {
      employeeId: tokenVerify?.employeeId,
      employeeFullName: tokenVerify?.employeeFullName,
      employeeEmail: tokenVerify?.employeeEmail,
      employeeRole: tokenVerify?.employeeRole,
    };

    const publicKeyString = crypto.createPublicKey(token_publicKey);

    const { accessToken: newAT, refreshToken: newRT } =
      await createDoubleTokens({
        payload,
        publicKey: publicKeyString,
        privateKey: token_privateKey,
      });

    // Update refreshToken
    await keyStore.updateOne({
      $set: {
        token_refreshTokenUsing: newRT,
      },
      $addToSet: {
        token_refreshTokenUsed: refreshToken,
      },
    });
    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: VALUE_CONSTANT.RT_NAME,
      tokenValue: newRT,
      day: 30,
      res,
    });
    return {
      employee: payload,
      newAccessToken: newAT,
    };
  }

  static async changePassword(req: Request, dataChangePass: IAuthChangePass) {
    const { employeeEmail } = req.app.locals.employee as ITokenVerify;
    const employee = await EmployeeRepository.getByEmail(`${employeeEmail}`);
    if (!employee) {
      throw new NotFoundError('Người dùng không tồn tại');
    }
    const isMatchingPassword = await bcrypt.compare(
      dataChangePass.employee_oldPassword,
      employee.employee_password
    );

    if (!isMatchingPassword) {
      throw new BadRequestError('Mật khẩu củ không đúng');
    }
    if (
      dataChangePass.employee_password !==
      dataChangePass.employee_confirmPassword
    ) {
      throw new BadRequestError('Xác nhận mật khẩu không đúng');
    }

    const newPasswordEncode = await bcrypt.hash(
      dataChangePass.employee_password,
      VALUE_CONSTANT.SALT_PASSWORD
    );

    await employee.updateOne({
      $set: { employee_password: newPasswordEncode },
    });
    return;
  }
}

module.exports = AuthService;
