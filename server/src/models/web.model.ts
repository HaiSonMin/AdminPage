import { model, Schema } from 'mongoose';
import { MODALS_NAME } from '../constant';
import { IWeb } from '../interface/model/web';

const WebSchema = new Schema<IWeb>(
  {
    web_name: {
      type: String,
      required: [true, 'Vui lòng bổ sung tên web'],
      unique: true,
    },
    web_url: {
      type: String,
      required: [true, 'Vui lòng bổ sung đường dẫn web'],
    },
  },
  { timestamps: true }
);

export default model(MODALS_NAME.WEB, WebSchema);
