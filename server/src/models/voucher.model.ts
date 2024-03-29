import { EVoucherType } from '@/enum';
import { model, Schema } from 'mongoose';
import { MODALS_NAME } from '@/constant';
import { IVoucher } from '@/interface/model/voucher';
import { BadRequestError } from '@/core/error.response';

const VoucherSchema = new Schema<IVoucher>(
  {
    voucher_name: {
      type: String,
      unique: true,
      required: [true, 'Vui lòng bổ tên voucher'],
    },
    voucher_type: {
      type: String,
      enum: EVoucherType,
      default: EVoucherType.FIX_AMOUNT,
    },
    voucher_value: {
      type: Number,
      required: [true, 'Vui lòng bổ sung giá trị voucher'],
    },
    voucher_web: {
      type: Schema.ObjectId,
      ref: MODALS_NAME.WEB,
    },
  },
  { timestamps: true }
);

VoucherSchema.index({ voucher_name: 'text' });

VoucherSchema.pre<IVoucher>('save', function (next) {
  if (this.voucher_type === EVoucherType.FIX_AMOUNT) {
    if ((this.voucher_value as number) < 50_000)
      next(new BadRequestError('Giá trị voucher phải >= 50000nvđ'));
    if ((this.voucher_value as number) % 10000 !== 0)
      next(new BadRequestError('Giá trị voucher phải là bội số của 10000vnđ'));
  } else if (this.voucher_type === EVoucherType.PERCENTAGE) {
    if (
      (this.voucher_value as number) < 1 ||
      (this.voucher_value as number) > 100
    )
      next(new BadRequestError('Giá trị 1 < voucher < 100'));
  }
  next();
});

export default model(MODALS_NAME.VOUCHER, VoucherSchema);
