export default class ServiceUtils {
  static extractData(res) {
    return res.data;
  }

  static handleError(err) {
    console.error(err);
    return err.response.data;
  }
}
