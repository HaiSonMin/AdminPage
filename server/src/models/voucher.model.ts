import { EVoucherType } from '../enum';
import { model, Schema } from 'mongoose';
import { MODALS_NAME } from '../constant';
import { IVoucher } from '../interface/model/voucher';
import { BadRequestError } from '../core/error.response';

const VoucherSchema = new Schema<IVoucher>(
  {
    voucher_name: {
      type: String,
      unique: true,
      required: [true, 'Vui lòng bổ tên voucher'],
      index: 'text',
    },
    voucher_type: {
      type: String,
      enum: EVoucherType,
      default: EVoucherType.FIX_AMOUNT,
    },
    voucher_value: {
      type: String,
      required: [true, 'Vui lòng bổ sung giá trị voucher'],
    },
    voucher_web: {
      type: Schema.ObjectId,
      ref: MODALS_NAME.WEB,
    },
  },
  { timestamps: true }
);

VoucherSchema.pre<IVoucher>('save', function (next) {
  if (this.voucher_type === EVoucherType.FIX_AMOUNT) {
    if (parseInt(this.voucher_value) < 50_000)
      next(new BadRequestError('Giá trị voucher phải >= 50000nvđ'));
    if (parseInt(this.voucher_value) % 10000 !== 0)
      next(new BadRequestError('Giá trị voucher phải là bội số của 10000vnđ'));
  } else if (this.voucher_type === EVoucherType.PERCENTAGE) {
    if (parseInt(this.voucher_value) < 1 || parseInt(this.voucher_value) > 100)
      next(new BadRequestError('Giá trị 1 < voucher < 100'));
  }
  next();
});

export default model(MODALS_NAME.VOUCHER, VoucherSchema);
