import { loginMultiFb } from '@/hooks/scripts/facebook';

export default class FacebookScriptService {
  static async login() {
    await loginMultiFb();
  }
}
