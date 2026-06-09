function toCreateDto(body) {
    return {
        company: body.company,
        position: body.position,
        vacancyUrl: body.vacancyUrl,
        applicationDate: body.applicationDate,
        notes: body.notes,
        status: body.status
    };
}

module.exports = { toCreateDto };