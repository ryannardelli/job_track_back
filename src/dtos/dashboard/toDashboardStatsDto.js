function toDashboardStatsDto(stats) {
  return {
    total: stats.total,
    applied: stats.applied,
    interview: stats.interview,
    offer: stats.offer,
    rejected: stats.rejected,
  };
}

module.exports = { toDashboardStatsDto };