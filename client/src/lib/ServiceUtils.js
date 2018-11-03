import localforage from "localforage";

export default class ServiceUtils {
  static extractData(res) {
    return res.data;
  }

  static handleError(err) {
    console.error(err);
    return err.response.data;
  }

  static async setHeader(res) {
    try {
      await localforage.setItem("token", "Bearer " + res.data.token);
      await localforage.setItem("user", res.data.user);
      return res.data.user;
    } catch (err) {
      console.error(err);
    }
  }

  static async getHeader() {
    try {
      const authHeader = await localforage.getItem("token");
      return { headers: { Authorization: authHeader } };
    } catch (err) {
      console.error(err);
    }
  }

  static async authenticate() {
    try {
      const token = await localforage.getItem("token");
      if (token) return true;
      return false;
    } catch (err) {
      console.log("NO");
      return false;
    }
  }
}
