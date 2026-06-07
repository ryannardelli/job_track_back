function toCreateDto(body) {
    return {
        company: body.company,
        position: body.position,
        status: body.status
    };
}

module.exports = { toCreateDto };