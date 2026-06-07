const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/Application");
const { checkToken } = require("../middleware/checkToken");

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Operações relacionadas às candidaturas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         company:
 *           type: string
 *           example: Google
 *         position:
 *           type: string
 *           example: Desenvolvedor Front-end
 *         status:
 *           type: string
 *           enum:
 *             - WISHLIST
 *             - APPLIED
 *             - INTERVIEW
 *             - OFFER
 *             - REJECTED
 *           example: APPLIED
 *         userId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /application:
 *   post:
 *     summary: Cria uma nova candidatura
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *             properties:
 *               company:
 *                 type: string
 *                 example: Google
 *               position:
 *                 type: string
 *                 example: Desenvolvedor Front-end
 *               status:
 *                 type: string
 *                 example: WISHLIST
 *     responses:
 *       201:
 *         description: Candidatura criada com sucesso
 */
router.post("/", checkToken, applicationController.create);

/**
 * @swagger
 * /application:
 *   get:
 *     summary: Retorna todas as candidaturas do usuário autenticado
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de candidaturas retornada com sucesso
 */
router.get("/", checkToken, applicationController.findAll);

/**
 * @swagger
 * /application/board:
 *   get:
 *     summary: Retorna as candidaturas agrupadas por status para o quadro Kanban
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do quadro retornados com sucesso
 */
router.get("/board", checkToken, applicationController.board);

/**
 * @swagger
 * /application/{uuid}:
 *   get:
 *     summary: Retorna uma candidatura por UUID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da candidatura
 *     responses:
 *       200:
 *         description: Candidatura encontrada
 *       404:
 *         description: Candidatura não encontrada
 */
router.get("/:uuid", checkToken, applicationController.findByUuid);

/**
 * @swagger
 * /application/{uuid}:
 *   patch:
 *     summary: Atualiza uma candidatura
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da candidatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - WISHLIST
 *                   - APPLIED
 *                   - INTERVIEW
 *                   - OFFER
 *                   - REJECTED
 *     responses:
 *       200:
 *         description: Candidatura atualizada com sucesso
 *       404:
 *         description: Candidatura não encontrada
 */
router.patch("/:uuid", checkToken, applicationController.update);

/**
 * @swagger
 * /application/{uuid}/status:
 *   patch:
 *     summary: Atualiza apenas o status da candidatura (drag and drop)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - WISHLIST
 *                   - APPLIED
 *                   - INTERVIEW
 *                   - OFFER
 *                   - REJECTED
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.patch(
  "/:uuid/status",
  checkToken,
  applicationController.updateStatus
);

/**
 * @swagger
 * /application/{uuid}:
 *   delete:
 *     summary: Remove uma candidatura
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Candidatura removida com sucesso
 *       404:
 *         description: Candidatura não encontrada
 */
router.delete("/:uuid", checkToken, applicationController.remove);

module.exports = router;