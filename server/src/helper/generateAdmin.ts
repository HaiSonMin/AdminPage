import { employeeModel } from '../models';
import { env } from 'process';
import { infoAdmin } from '../constant';

export const generateAdmin = async () => {
  //   ADMIN_USERNAME;
  //   ADMIN_PASSWORD;
  //   ADMIN_PHONENUMBER;
  //   ADMIN_FULLNAME;
  //   ADMIN_EMAIL;
  const admin = await employeeModel
    .findOne({
      employee_userName: env.ADMIN_USERNAME,
    })
    .lean()
    .exec();
  if (!admin) await employeeModel.create(infoAdmin);
  return;
};
