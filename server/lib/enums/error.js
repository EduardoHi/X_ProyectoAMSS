const { Enum } = require('enumify')

class ErrorEnum extends Enum {
    static get names() {
        return ErrorEnum.enumValues.map(e => e.name)
    }
}

ErrorEnum.initEnum({
    GENERIC: {
        display: "Algo salió mal."
    }
})

module.exports = ErrorEnum