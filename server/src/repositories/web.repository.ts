import { IQuery } from '../interface';
import { IWebDto } from '../interface/model/web';
import { webModel } from '../models';
import { skipPage } from '../utils';

export class WebRepository {
  static async getById(webId: string) {
    return await webModel.findById(webId).lean().exec();
  }

  static async getAll({ limit, page }: IQuery) {
    const [totalWebs, webs] = await Promise.all([
      webModel.countDocuments(),
      webModel
        .find()
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .lean()
        .exec(),
    ]);

    return { totalWebs, webs };
  }

  static async update(webId: string, payload: IWebDto) {
    return await webModel.findByIdAndUpdate(webId, payload, { new: true });
  }

  static async delete(webId: string) {
    return await webModel.findByIdAndDelete(webId);
  }
}
