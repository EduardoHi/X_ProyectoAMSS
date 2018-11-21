import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

const MODULE_PATH = Config.apiURL() + "/user";
export default class UserService {
  static async getAll() {
    try {
      const res = await axios.get(
        MODULE_PATH + "/",
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
        MODULE_PATH + "/" + id,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async create(user) {
    try {
      const res = await axios.post(MODULE_PATH + "/", user);
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async adminCreate(user) {
    try {
      const res = await axios.post(
        MODULE_PATH + "/create",
        user,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async update(id, user) {
    try {
      const res = await axios.put(
        MODULE_PATH + "/" + id,
        user,
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
        MODULE_PATH + "/" + id,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }
}
