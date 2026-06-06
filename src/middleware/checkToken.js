const TokenInvalid = require("../exceptions/domain/auth/TokenInvalid");
const UnauthorizedError = require("../exceptions/domain/auth/UnauthorizedError");
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) throw new UnauthorizedError();

    const secret = process.env.JWT_SECRET;

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (e) {
        throw new TokenInvalid();
    }
}

module.exports = { checkToken };