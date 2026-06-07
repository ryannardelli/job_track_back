const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/Dashboard");
const { checkToken } = require("../middleware/checkToken");

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Retorna estatísticas do dashboard de candidaturas
 *     description: >
 *       Retorna métricas gerais das candidaturas do usuário autenticado,
 *       incluindo total de vagas, candidaturas aplicadas, entrevistas,
 *       propostas e rejeições com seus respectivos percentuais.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 18
 *                 applied:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 8
 *                     percent:
 *                       type: number
 *                       example: 44
 *                 interview:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 4
 *                     percent:
 *                       type: number
 *                       example: 22
 *                 offer:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 1
 *                     percent:
 *                       type: number
 *                       example: 6
 *                 rejected:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 5
 *                     percent:
 *                       type: number
 *                       example: 28
 *       401:
 *         description: Token inválido ou ausente
 */
router.get(
  "/stats",
  checkToken,
  dashboardController.getDashboardStats
);

module.exports = router;