import { ESocial, EStatus } from '@/enum';
import { IBaseModel } from '@/interface/common';

export interface IMail extends IBaseModel {
  mail_address: string;
  mail_status: string;
  mail_lastLogin: string;
  mail_socials: ESocial[];
  mail_displayName: string;
  mail_description: string;
}
