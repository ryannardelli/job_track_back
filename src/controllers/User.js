const userService = require("../services/userService");
const { toUserDto } = require("../dtos/users/toUserDto");
const { toUpdateDto } = require("../dtos/users/toUpdateDto");

async function me(req, res, next) {
  try {
    const userUuid = req.user.uuid;

    const user = await userService.getUserByUuid(userUuid);

    return res.status(200).json(toUserDto(user));
  } catch (err) {
    next(err);
  }
}

async function findAll(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        const usersDto = users.map(toUserDto);
        return res.status(201).json(usersDto);
    } catch(err) {
        next(err);
    }
}

async function findByUuid(req, res, next) {
    try {
        const { uuid } = req.params;
        const user = await userService.getUserByUuid(id);
        res.status(200).json(toUserDto(user));
    } catch(err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const updateDto = {
            uuid: req.params.uuid,
            ...toUpdateDto(req.body)
        };

        await userService.updateUser(updateDto);
        res.status(201).json({ message: "Usuário atualizado com sucesso!" });
    } catch (err) {
        next(err);
    }
}

module.exports = { findAll, findByUuid, update, me};