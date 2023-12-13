import { webModel } from '../models';
import { WebRepository } from '../repositories';
import { IQuery } from '../interface';
import { BadRequestError, NotFoundError } from '../core/error.response';
import { IWebDto } from '../interface/model/web';

export default class WebService {
  static async createWeb(payload: IWebDto) {
    const newWeb = await webModel.create(payload);
    return newWeb;
  }

  static async getById(webId: string) {
    const web = await WebRepository.getById(webId);
    if (!web) throw new NotFoundError('Web không tồn tại');
    return web;
  }

  static async getAllWebs(query: IQuery) {
    const { totalWebs, webs } = await WebRepository.getAll(query);
    return { totalWebs, webs };
  }

  static async updateWeb(webId: string, payload: IWebDto) {
    const webUpdated = await WebRepository.update(webId, payload);
    if (!webUpdated) throw new BadRequestError('Cập nhật thất bại');
    await webUpdated.save();
    return webUpdated;
  }

  static async deleteWeb(webId: string) {
    const webDeleted = await WebRepository.delete(webId);
    if (!webDeleted)
      throw new BadRequestError('Xóa thất bại, vui lòng thử lại');
    return webDeleted;
  }
}
