import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

export default class UserAuthService {
  static MODULE_PATH = Config.apiURL() + "/auth-user";

  static async login(user) {
    try {
      const res = await axios.post(this.MODULE_PATH + "/", user);
      return await ServiceUtils.setCustomerHeader(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
