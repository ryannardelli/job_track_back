function toApplicationDto(application) {
    return {
        uuid: application.uuid,
        company: application.company,
        position: application.position,
        vacancyUrl: application.vacancyUrl,
        status: application.status,
        applicationDate: application.applicationDate,
        notes: application.notes,
        userId: application.userId,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt
    };
}

module.exports = { toApplicationDto };