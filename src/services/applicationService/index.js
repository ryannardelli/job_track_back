const ApplicationNotFoundError = require("../../exceptions/domain/applications/ApplicationNotFoundError");
const ApplicationAlreadyExistsError = require("../../exceptions/domain/applications/ApplicationAlreadyExistsError");
const ApplicationForbiddenError = require("../../exceptions/domain/applications/ApplicationForbiddenError");
const ApplicationValidationError = require("../../exceptions/domain/applications/ApplicationValidationError");
const UserNotFoundError = require("../../exceptions/domain/users/UserNotFoundError");

const applicationRepository = require("../../repositories/applicationRepository");
const userRepository = require("../../repositories/userRepository");

async function getAllApplications(userId, filters = {}) {
    return applicationRepository.findAllByUser(userId, filters);
}

async function getApplicationsByUser(userId) {
    return applicationRepository.findAllByUser(userId);
}

async function getApplicationByUuid(applicationId, userId) {
    const application = await applicationRepository.findByUuid(applicationId);

    if (!application) {
        throw new ApplicationNotFoundError();
    }

    if (application.userId !== userId) {
        throw new ApplicationForbiddenError();
    }

    return application;
}

async function createApplication(data, userId) {
    const user = await userRepository.findByUuid(userId);

    if (!user) {
        throw new UserNotFoundError();
    }

    if (!data.company || data.company.trim().length < 2) {
        throw new ApplicationValidationError(
            "Nome da empresa é obrigatório."
        );
    }

    if (!data.position || data.position.trim().length < 2) {
        throw new ApplicationValidationError(
            "Cargo é obrigatório."
        );
    }

    const existingApplication =
        await applicationRepository.findByCompanyAndPosition(
            userId,
            data.company,
            data.position
        );

    if (existingApplication) {
        throw new ApplicationAlreadyExistsError();
    }

    return applicationRepository.create({
        company: data.company.trim(),
        position: data.position.trim(),
        vacancyUrl: data.vacancyUrl || null,
        status: data.status || "WISHLIST",
        applicationDate: data.applicationDate || null,
        notes: data.notes || null,
        userId
    });
}

async function updateApplication(
    applicationId,
    updateDto,
    userId
) {
    const application = await applicationRepository.findByUuid(
        applicationId
    );

    if (!application) {
        throw new ApplicationNotFoundError();
    }

    if (application.userId !== userId) {
        throw new ApplicationForbiddenError();
    }

    const updateData = {};

    if (updateDto.company !== undefined) {
        if (updateDto.company.trim().length < 2) {
            throw new ApplicationValidationError(
                "Empresa inválida."
            );
        }

        updateData.company = updateDto.company.trim();
    }

    if (updateDto.position !== undefined) {
        if (updateDto.position.trim().length < 2) {
            throw new ApplicationValidationError(
                "Cargo inválido."
            );
        }

        updateData.position = updateDto.position.trim();
    }

    if (updateDto.status !== undefined) {
        const allowedStatus = [
            "APPLIED",
            "INTERVIEW",
            "OFFER",
            "REJECTED"
        ];

        if (!allowedStatus.includes(updateDto.status)) {
            throw new ApplicationValidationError(
                "Status inválido."
            );
        }

        updateData.status = updateDto.status;
    }

    if (updateDto.link !== undefined) {
        updateData.link = updateDto.link;
    }

    if (updateDto.notes !== undefined) {
        updateData.notes = updateDto.notes;
    }

    await applicationRepository.update(
        application,
        updateData
    );

    return applicationRepository.findByUuid(applicationId);
}

async function updateApplicationStatus(
    applicationId,
    status,
    userId
) {
    const application = await applicationRepository.findByUuid(
        applicationId
    );

    if (!application) {
        throw new ApplicationNotFoundError();
    }

    if (application.userId !== userId) {
        throw new ApplicationForbiddenError();
    }

    const allowedStatus = [
        "APPLIED",
        "INTERVIEW",
        "OFFER",
        "REJECTED"
    ];

    if (!allowedStatus.includes(status)) {
        throw new ApplicationValidationError(
            "Status inválido."
        );
    }

    application.status = status;

    await application.save();

    return application;
}

async function deleteApplication(
    applicationId,
    userId
) {
    const application = await applicationRepository.findByUuid(
        applicationId
    );

    if (!application) {
        throw new ApplicationNotFoundError();
    }

    if (application.userId !== userId) {
        throw new ApplicationForbiddenError();
    }

    await application.destroy();

    return {
        message: "Candidatura removida com sucesso."
    };
}

async function getBoard(userId) {
    const applications =
        await applicationRepository.findAllByUser(userId);

    return {
        WISHLIST: applications.filter(
            app => app.status === "WISHLIST"
        ),
        APPLIED: applications.filter(
            app => app.status === "APPLIED"
        ),
        INTERVIEW: applications.filter(
            app => app.status === "INTERVIEW"
        ),
        OFFER: applications.filter(
            app => app.status === "OFFER"
        ),
        REJECTED: applications.filter(
            app => app.status === "REJECTED"
        )
    };
}

module.exports = {
    getAllApplications,
    getApplicationsByUser,
    getApplicationByUuid,
    createApplication,
    updateApplication,
    updateApplicationStatus,
    getBoard,
    deleteApplication
};