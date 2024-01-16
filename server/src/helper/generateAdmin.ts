import { employeeModel } from '@/models';
import { env } from 'process';
import { infoAdmin } from '@/constant';

export const generateAdmin = async () => {
  //   ADMIN_USERNAME;
  //   ADMIN_PASSWORD;
  //   ADMIN_PHONENUMBER;
  //   ADMIN_FULLNAME;
  //   ADMIN_EMAIL;
  const admin = await employeeModel
    .findOne({
      employee_fullName: env.ADMIN_FULLNAME,
      employee_phoneNumber: env.ADMIN_PHONENUMBER,
    })
    .lean()
    .exec();

  console.log('admin', admin);

  if (!admin) await employeeModel.create(infoAdmin);

  return;
};
