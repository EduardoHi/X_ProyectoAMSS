import Config from "../lib/config";
import axios from "axios";
import { ServiceUtils } from "../lib/ServiceUtils";

export class TodoService {
  static MODULE_PATH = Config.apiURL() + "/todo";

  static async getAll() {
    try {
      const res = await axios.get(this.MODULE_PATH + "/");
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
