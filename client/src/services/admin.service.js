import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

const MODULE_PATH = Config.apiURL() + "/admin";

export default class AdminService {
  static async update(id, admin) {
    try {
      const res = await axios.put(
        MODULE_PATH + "/" + id,
        admin,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
