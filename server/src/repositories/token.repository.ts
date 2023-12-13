import { tokenModel } from '../models';

export class TokenRepository {
  static async getRefreshTokenUsing(refreshToken: string) {
    return await tokenModel
      .findOne({
        token_refreshTokenUsing: refreshToken,
      })
      .exec();
  }
  static async deleteByRefreshToken(refreshToken: string) {
    return await tokenModel
      .findOneAndDelete({
        token_refreshTokenUsing: refreshToken,
      })
      .lean()
      .exec();
  }
}
