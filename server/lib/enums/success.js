const { Enum } = require("enumify");

class SuccessEnum extends Enum {
  static get names() {
    return SuccessEnum.enumValues.map(e => e.name);
  }
}

SuccessEnum.initEnum({
  DELETE: {
    display: "El registro se eliminó exitosamente."
  },
  UPDATE: {
    display: "El registro se actualizó exitosamente."
  }
});

module.exports = SuccessEnum;
