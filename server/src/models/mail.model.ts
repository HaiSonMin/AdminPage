import { Schema, model } from 'mongoose';
import { MODALS_NAME } from '@/constant';
import { IMail } from '@/interface/model/mail';
import { ESocial, EStatus } from '@/enum';

const MailSchema = new Schema<IMail>(
  {
    mail_address: {
      type: String,
      required: [true, 'Vui lòng bổ sung địa chỉ email'],
    },
    mail_description: {
      type: String,
    },
    mail_displayName: {
      type: String,
    },
    mail_lastLogin: {
      type: String,
    },
    mail_socials: {
      type: [String],
      enum: ESocial,
    },
    mail_status: {
      type: String,
      default: EStatus.ACTIVATED,
    },
  },
  {
    timestamps: true,
  }
);

export default model(MODALS_NAME.MAIL, MailSchema);
