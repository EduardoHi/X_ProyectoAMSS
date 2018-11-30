import Config from "../lib/config";
import axios from "axios";
import ServiceUtils from "../lib/ServiceUtils";

const MODULE_PATH = Config.apiURL() + "/trip";
export default class TripService {
  static async get(id) {
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

  static async request(trip) {
    try {
      const res = await axios.post(
        MODULE_PATH + "/",
        trip,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async getAllRequest() {
    try {
      const res = await axios.get(
        MODULE_PATH + "/request",
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async getTripWithDrivers(tripId) {
    try {
      const res = await axios.get(
        MODULE_PATH + "/assign/" + tripId,
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async getAllCustomerAccepted() {
    try {
      const res = await axios.get(
        MODULE_PATH + "/customer-accepted",
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async getAllDriverAccepted() {
    try {
      const res = await axios.get(
        MODULE_PATH + "/driver-accepted",
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async getCustomerHistory() {
    try {
      const res = await axios.get(
        MODULE_PATH + "/customer-history",
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async getDriverHistory() {
    try {
      const res = await axios.get(
        MODULE_PATH + "/driver-history",
        await ServiceUtils.getHeader()
      );
      return ServiceUtils.extractData(res);
    } catch (err) {
      throw ServiceUtils.handleError(err);
    }
  }

  static async update(id, trip) {
    try {
      const res = await axios.put(
        MODULE_PATH + "/" + id,
        trip,
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
