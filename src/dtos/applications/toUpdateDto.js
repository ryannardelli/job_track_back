function toUpdateDto(body) {
    return {
        company: body.company,
        position: body.position,
        vacancyUrl: body.vacancyUrl,
        status: body.status,
        applicationDate: body.applicationDate,
        notes: body.notes
    };
}

module.exports = { toUpdateDto };