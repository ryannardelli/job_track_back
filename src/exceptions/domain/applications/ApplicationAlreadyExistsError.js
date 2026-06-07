class ApplicationAlreadyExistsError extends Error {
    constructor(message = "A candidatura informada já existe.") {
        super(message);
        this.name = "ApplicationAlreadyExistsError";
        this.statusCode = 400;
    }
}

module.exports = ApplicationAlreadyExistsError;