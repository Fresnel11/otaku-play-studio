const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/avatar/generate:
 *   post:
 *     summary: Génère un avatar avec IA
 *     tags: [Avatar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Description de l'avatar à générer
 *               width:
 *                 type: number
 *                 default: 512
 *               height:
 *                 type: number
 *                 default: 512
 *               steps:
 *                 type: number
 *                 default: 20
 *               guidance:
 *                 type: number
 *                 default: 7.5
 *               seed:
 *                 type: number
 *     responses:
 *       200:
 *         description: Avatar généré avec succès
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post('/generate', protect, avatarController.generateAvatar);

/**
 * @swagger
 * /api/avatar/health:
 *   get:
 *     summary: Vérifie l'état du service d'avatar
 *     tags: [Avatar]
 *     responses:
 *       200:
 *         description: État du service
 */
router.get('/health', avatarController.checkHealth);

module.exports = router;
