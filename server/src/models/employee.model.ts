import bcrypt from 'bcrypt';
import { EGender, ERole } from '@/enum';
import { Schema, model } from 'mongoose';
import { EmployeeRepository } from '@/repositories';
import { IEmployee } from '@/interface/model/employee';
import { MODALS_NAME, VALUE_CONSTANT } from '@/constant';
import { generateRandomNumber, generatorUsername, latinizeStr } from '@/utils';

const EmployeeSchema = new Schema<IEmployee>(
  {
    employee_userName: {
      type: String,
    },
    employee_fullName: {
      type: String,
      required: [true, 'Vui lòng bổ sung họ và tên'],
      minlength: 6,
      maxlength: 50,
    },
    employee_email: {
      type: String,
      match: [
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
        'Email không đúng định dạng',
      ],
      unique: true,
      required: true,
    },
    employee_gender: {
      type: String,
      enum: EGender,
      required: [true, 'Vui lòng bổ sung giới tính'],
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
      required: [true, 'Vui lòng bổ sung số điện thoại'],
      match: [
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        'Số điện thoại không đúng định dạng',
      ],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

EmployeeSchema.index({
  employee_email: 'text',
  employee_fullName: 'text',
  employee_phoneNumber: 'text',
});

EmployeeSchema.pre('save', async function (next) {
  // generate userName after save to db
  const userNameGenerate = generatorUsername(this.employee_fullName);
  this.employee_userName = latinizeStr(userNameGenerate);

  const employee = await EmployeeRepository.getByUserName(
    this.employee_userName
  );

  if (employee)
    this.employee_userName = `${
      this.employee_userName
    }${generateRandomNumber()}`;

  this.employee_password = await bcrypt.hash(
    this.employee_password,
    VALUE_CONSTANT.SALT_PASSWORD
  );
  next();
});

EmployeeSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.employee_password);
};

export default model(MODALS_NAME.EMPLOYEE, EmployeeSchema);
