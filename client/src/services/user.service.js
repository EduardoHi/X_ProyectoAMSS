import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

export default class UserService {
  static MODULE_PATH = Config.apiURL() + "/user";

  static async create(user) {
    try {
      const res = await axios.post(this.MODULE_PATH + "/", user);
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
