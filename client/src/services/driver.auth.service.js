import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

export default class DriverAuthService {
  static MODULE_PATH = Config.apiURL() + "/auth-driver";

  static async login(driver) {
    try {
      const res = await axios.post(this.MODULE_PATH + "/", driver);
      console.log("res", res);
      return await ServiceUtils.setDriverHeader(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async recoverPassword(mail) {
    try {
      const res = await axios.post(this.MODULE_PATH + "/recoverPassword", mail);
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
