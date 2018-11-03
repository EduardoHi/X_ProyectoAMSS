import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

export default class TodoService {
  static MODULE_PATH = Config.apiURL() + "/todo";

  static async getAll() {
    try {
      const headers = await ServiceUtils.getHeader();
      const res = await axios.get(this.MODULE_PATH + "/", headers);
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
