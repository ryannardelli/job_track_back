const Application = require("../models/Application");

module.exports = {
  findAll: () => Application.findAll(),

  findByUuid: (uuid) => Application.findByPk(uuid),

  findAllByUser: (userId) =>
    Application.findAll({
      where: { userId }
    }),

  findByCompanyAndPosition: (userId, company, position) =>
    Application.findOne({
      where: {
        userId,
        company,
        position
      }
    }),

  findByStatus: (userId, status) =>
    Application.findAll({
      where: {
        userId,
        status
      }
    }),

  countByStatus: async (userId, status) =>
    Application.count({
      where: {
        userId,
        status
      }
    }),

  create: (data) => Application.create(data),

  update: (application, data) => application.update(data),

  delete: (application) => application.destroy(),

  save: (application) => application.save(),
};