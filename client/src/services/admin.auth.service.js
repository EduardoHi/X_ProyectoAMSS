import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

export default class AdminAuthService {
  static MODULE_PATH = Config.apiURL() + "/auth-admin";

  static async login(user) {
    try {
      const res = await axios.post(this.MODULE_PATH + "/", user);
      return await ServiceUtils.setAdminHeader(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
