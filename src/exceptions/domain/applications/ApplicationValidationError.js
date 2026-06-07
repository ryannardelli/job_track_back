class ApplicationValidationError extends Error {
    constructor(message = "Dados da candidatura inválidos.") {
        super(message);
        this.name = "ApplicationValidationError";
        this.statusCode = 400;
    }
}

module.exports = ApplicationValidationError;