class ApplicationForbiddenError extends Error {
    constructor() {
        super("Você não tem permissão para modificar esta candidatura.");
        this.name = "ApplicationForbiddenError";
        this.statusCode = 403;
    }
}

module.exports = ApplicationForbiddenError;