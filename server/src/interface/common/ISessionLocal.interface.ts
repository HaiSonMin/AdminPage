import { ESession } from "src/enum/ESession.enum";

export interface ISessionLocal {
  sessionOTP: string; // Mã OTP
  sessionDuration: number; // Thời gian mã hết hạn(s);
  sessionData: any; // Dữ liệu đăng nhập
  sessionConfirm: boolean; // Cờ xác nhận OTP
  sessionType: ESession; // Cờ xác nhận OTP
}
