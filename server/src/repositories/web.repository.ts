import { IQuery, IResultGetMany } from '@/interface';
import { IWeb, IWebDto } from '@/interface/model/web';
import { webModel } from '@/models';
import { skipPage, sortBy } from '@/utils';

export class WebRepository {
  static async getById(webId: string) {
    return await webModel.findById(webId).lean().exec();
  }

  static async getAll({ limit, page, sort }: IQuery) {
    const [totalWebs, webs] = await Promise.all([
      webModel.countDocuments(),
      webModel
        .find()
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .sort(sortBy(sort))
        .lean()
        .exec(),
    ]);

    return { totalWebs, webs };
  }

  static async search({ limit, page, sort, keySearch }: IQuery) {
    const [totalWebs, webs] = await Promise.all([
      webModel.countDocuments({ $text: { $search: keySearch } }),
      webModel
        .find(
          { $text: { $search: keySearch } },
          { score: { $meta: 'textScore' } }
        )
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .sort({ score: { $meta: 'textScore' } }) // Assuming you have a convertSortBy function
        .lean()
        .exec(),
    ]);
    const validWebs = Array.isArray(webs) ? webs : [];
    return { totalWebs, webs: validWebs };
  }

  static async update(webId: string, payload: IWebDto) {
    return await webModel.findByIdAndUpdate(webId, payload, { new: true });
  }

  static async delete(webId: string) {
    return await webModel.findByIdAndDelete(webId);
  }
}
