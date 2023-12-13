import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { MODALS_NAME, VALUE_CONSTANT } from '../constant';
import { ERole } from '../enum';
import { IEmployee } from '../interface/model/employee';

const CustomerSchema = new Schema<IEmployee>(
  {
    employee_userName: {
      type: String,
      required: [true, 'Vui lòng bổ sung tên người dùng'],
      minlength: 3,
      maxlength: 50,
    },
    employee_fullName: {
      type: String,
      required: [true, 'Vui lòng bổ sung họ và tên'],
      minlength: 6,
      maxlength: 50,
    },
    employee_email: {
      type: String,
      match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      unique: true,
      required: true,
    },
    employee_password: {
      type: String,
      required: [true, 'Vui lòng bổ sung mật khẩu'],
      select: false,
    },
    // ADMIN, SALE, MKT
    employee_role: {
      type: String,
      enum: ERole,
      required: [true, 'Vui lòng bổ sung quyền quản trị cho tài khoảng'],
    },
    employee_phoneNumber: {
      type: String,
      match: [
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        'Số điện thoại không đúng định dạng',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// CustomerSchema.index({
//   employee_email: 1,
//   employee_fullName: 1,
//   employee_phoneNumber: 1,
// });

CustomerSchema.pre('save', async function (next) {
  this.employee_password = await bcrypt.hash(
    this.employee_password,
    VALUE_CONSTANT.SALT_PASSWORD
  );
});

CustomerSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.employee_password);
};

export default model(MODALS_NAME.EMPLOYEE, CustomerSchema);
