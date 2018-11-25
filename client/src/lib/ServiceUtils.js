import localforage from "localforage";

export default class ServiceUtils {
  static customer = "customer";
  static driver = "driver";
  static admin = "admin";

  static currentUser = null;
  static currentUserType = null;

  static extractData(res) {
    return res.data;
  }

  static handleError(err) {
    console.error(err);
    return err.response.data;
  }

  static async getUser() {
    if (this.currentUser && this.currentUserType)
      return { user: this.currentUser, userType: this.currentUserType };

    try {
      this.currentUser = await localforage.getItem("user");
      const auth = await localforage.getItem("auth");
      return { user: this.currentUser, userType: auth.type };
    } catch (err) {
      console.error(err);
    }
  }

  static async setUser(user) {
    try {
      this.currentUser = user;
      await localforage.setItem("user", user);
    } catch (err) {
      console.error(err);
    }
  }

  static async authenticateUser() {
    try {
      const auth = await localforage.getItem("auth");
      if (
        auth &&
        auth.token &&
        (auth.type === this.admin ||
          auth.type === this.customer ||
          auth.type === this.driver)
      )
        return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  static async setAdminHeader(res) {
    try {
      await localforage.setItem("auth", {
        token: "Bearer " + res.data.token,
        type: this.admin
      });
      await localforage.setItem("user", res.data.admin);
      return res.data.admin;
    } catch (err) {
      console.error(err);
    }
  }

  static async authenticateAdmin() {
    try {
      const auth = await localforage.getItem("auth");
      if (auth && auth.token && auth.type === this.admin) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  static async setDriverHeader(res) {
    try {
      await localforage.setItem("auth", {
        token: "Bearer " + res.data.token,
        type: this.driver
      });
      await localforage.setItem("user", res.data.driver);
      return res.data.driver;
    } catch (err) {
      console.error(err);
    }
  }

  static async authenticateCustomer() {
    try {
      const auth = await localforage.getItem("auth");
      if (auth && auth.token && auth.type === this.driver) return true;
      return false;
    } catch (err) {
      return false;
    }
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
      const authHeader = await localforage.getItem("auth");
      return { headers: { Authorization: authHeader.token } };
    } catch (err) {
      console.error(err);
    }
  }

  static async logout() {
    try {
      await localforage.removeItem("auth");
      await localforage.removeItem("user");
      this.currentUser = null;
      this.currentUserType = null;
    } catch (err) {
      console.error(err);
    }
  }
}
