function toUserDto(user) {
    return {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    }
}

module.exports = { toUserDto };