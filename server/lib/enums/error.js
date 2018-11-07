const { Enum } = require("enumify");

class ErrorEnum extends Enum {
  static get names() {
    return ErrorEnum.enumValues.map(e => e.name);
  }
}

ErrorEnum.initEnum({
  GENERIC: {
    display: "Algo salió mal."
  },
  UNAUTHORIZED: {
    display: "No tienes los permisos necesarios para accesar."
  },
  NO_ACCOUNT: {
    display: "No existe una cuenta asociada a ese correo electrónico."
  },
  INCORRECT_PASSWORD: {
    display: "Contraseña o correo electrónico incorrecto."
  },
  NO_USER_FOUND_WITH_MAIL: {
    display: "No existe ningun usuario registrado con ese correo.",
  },
  ERROR_SENDIND_MAIL: {
    display: "Ocurrió un error al mandar el correo",
  }
});

module.exports = ErrorEnum;
