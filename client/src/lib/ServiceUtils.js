import localforage from "localforage";

export default class ServiceUtils {
  static customer = "Customer";
  static driver = "Driver";
  static admin = "Admin";

  static extractData(res) {
    return res.data;
  }

  static handleError(err) {
    console.error(err);
    return err.response.data;
  }

  static async setCustomerHeader(res) {
    try {
      await localforage.setItem("auth", {
        token: "Bearer " + res.data.token,
        type: this.customer
      });
      await localforage.setItem("user", res.data.user);
      return res.data.user;
    } catch (err) {
      console.error(err);
    }
  }

  static async authenticateCustomer() {
    try {
      const auth = await localforage.getItem("auth");
      if (auth && auth.token && auth.type === this.customer) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  static async getHeader() {
    try {
      const authHeader = await localforage.getItem("auth").token;
      return { headers: { Authorization: authHeader } };
    } catch (err) {
      console.error(err);
    }
  }
}
