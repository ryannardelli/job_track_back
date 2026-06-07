const applicationService = require("../services/applicationService");

const { toApplicationDto } = require("../dtos/applications/toApplicationDto");
const { toCreateDto } = require("../dtos/applications/toCreateDto");
const { toUpdateDto } = require("../dtos/applications/toUpdateDto");

async function create(req, res, next) {
    try {
        const createDto = toCreateDto(req.body);

        const application =
            await applicationService.createApplication(
                createDto,
                req.user.uuid
            );

        return res.status(201).json(
            toApplicationDto(application)
        );
    } catch (err) {
        next(err);
    }
}

async function findAll(req, res, next) {
    try {
        const applications = await applicationService.getApplicationsByUser(
            req.user.uuid
        );

        const applicationsDto = applications.map(toApplicationDto);

        return res.status(200).json(applicationsDto);
    } catch (err) {
        next(err);
    }
}

async function findByUuid(req, res, next) {
    try {
        const { uuid } = req.params;

        const application = await applicationService.getApplicationByUuid(
            uuid
        );

        return res.status(200).json(toApplicationDto(application));
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const updateDto = {
            uuid: req.params.uuid,
            ...toUpdateDto(req.body)
        };

        await applicationService.updateApplication(updateDto);

        return res.status(200).json({
            message: "Candidatura atualizada com sucesso!"
        });
    } catch (err) {
        next(err);
    }
}

async function updateStatus(req, res, next) {
    try {
        const { uuid } = req.params;
        const { status } = req.body;

        await applicationService.updateApplicationStatus(
            uuid,
            status
        );

        return res.status(200).json({
            message: "Status atualizado com sucesso!"
        });
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const { uuid } = req.params;

        await applicationService.deleteApplication(uuid);

        return res.status(200).json({
            message: "Candidatura removida com sucesso!"
        });
    } catch (err) {
        next(err);
    }
}

async function board(req, res, next) {
    try {
        const board = await applicationService.getBoard(
            req.user.uuid
        );

        return res.status(200).json(board);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    findAll,
    findByUuid,
    update,
    updateStatus,
    remove,
    board,
};