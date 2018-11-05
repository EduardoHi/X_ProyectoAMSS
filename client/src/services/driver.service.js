import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

export default class DriverService {
  static MODULE_PATH = Config.apiURL() + "/driver";

  static async getAll() {
    try {
      const res = await axios.get(
        this.MODULE_PATH + "/",
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async create(driver) {
    try {
      const res = await axios.post(this.MODULE_PATH + "/", driver);
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
