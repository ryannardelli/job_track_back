class ApplicationNotFoundError extends Error {
    constructor(message = "Candidatura não encontrada") {
        super(message);
        this.name = "ApplicationNotFoundError";
        this.statusCode = 404;
    }
}

module.exports = ApplicationNotFoundError;