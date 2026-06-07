const dashboardService = require("../services/dashboardService");
const { toDashboardStatsDto } = require("../dtos/dashboard/toDashboardStatsDto");

async function getDashboardStats(req, res, next) {
  try {
    const userId = req.user.uuid;

    const stats = await dashboardService.getDashboardStats(userId);

    return res.status(200).json(toDashboardStatsDto(stats));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboardStats,
};