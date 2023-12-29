import { model, Schema } from 'mongoose';
import { MODALS_NAME } from '../constant';
import { ICustomer } from '../interface/model/customer';

const CustomerSchema = new Schema<ICustomer>(
  {
    customer_fullName: {
      type: String,
      required: [true, 'Vui lòng bổ sung họ và tên'],
    },
    customer_phoneNumber: {
      type: String,
      match: [
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        'Số điện thoại không đúng định dạng',
      ],
      required: true,
      unique: true,
    },
    // Yêu cầu về dịch vụ
    customer_requirement: {
      type: String,
      // required: [true, 'Vui lòng bổ sung yêu cầu cho nhân viên tư vấn'],
    },
    customer_voucher: {
      type: String,
      default: null,
    },
    customer_source: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a text index on customer_fullName
CustomerSchema.index({ customer_fullName: 1, type: 'text' });
CustomerSchema.index({ customer_phoneNumber: 1 });

export default model(MODALS_NAME.CUSTOMER, CustomerSchema);
