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

  static async getById(id) {
    try {
      const res = await axios.get(
        this.MODULE_PATH + "/" + id,
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

  static async adminCreate(driver) {
    try {
      const res = await axios.post(
        this.MODULE_PATH + "/create",
        driver,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async update(id, driver) {
    try {
      const res = await axios.put(
        this.MODULE_PATH + "/" + id,
        driver,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async delete(id) {
    try {
      const res = await axios.delete(
        this.MODULE_PATH + "/" + id,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
