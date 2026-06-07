const UserNotFoundError = require("../../exceptions/domain/users/UserNotFoundError");

const userRepository = require('../../repositories/userRepository');

async function getAllUsers() {
    return userRepository.findAll();
}

async function getUserByUuid(uuid) {
    const user = await userRepository.findByUuid(uuid);
    if(!user) throw new UserNotFoundError();
    
    return user;
}

async function updateUser(updateDto) {
    const { uuid, ...updatedData } = updateDto;
    const user = await userRepository.findByUuid(uuid);

    if(!user) throw new UserNotFoundError();

    await user.update(updatedData);
    return user.get({ plain: true });
}

module.exports = { getAllUsers, getUserByUuid, updateUser };