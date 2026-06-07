const UserNotFoundError = require("../../exceptions/domain/users/UserNotFoundError");
const applicationRepository = require("../../repositories/applicationRepository");

async function getDashboardStats(userId) {
  if (!userId) throw new UserNotFoundError();

  const total = await applicationRepository.countByUser(userId);

  const applied = await applicationRepository.countByStatus(
    userId,
    "APPLIED"
  );

  const interview = await applicationRepository.countByStatus(
    userId,
    "INTERVIEW"
  );

  const offer = await applicationRepository.countByStatus(
    userId,
    "OFFER"
  );

  const rejected = await applicationRepository.countByStatus(
    userId,
    "REJECTED"
  );

  const percent = (value) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  return {
    total,
    applied: {
      count: applied,
      percent: percent(applied),
    },
    interview: {
      count: interview,
      percent: percent(interview),
    },
    offer: {
      count: offer,
      percent: percent(offer),
    },
    rejected: {
      count: rejected,
      percent: percent(rejected),
    },
  };
}

module.exports = {
  getDashboardStats,
};