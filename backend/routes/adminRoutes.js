const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// Apply authentication and admin middleware to all routes
router.use(protect);
router.use(admin);

/**
 * @swagger
 * /api/admin/questions:
 *   post:
 *     summary: Crée une nouvelle question (Admin uniquement)
 *     tags: [Admin - Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - options
 *               - correctAnswer
 *               - category
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Quel est le vrai nom de L ?"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Lawliet", "Light", "Ryuk", "Misa"]
 *               correctAnswer:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 3
 *                 example: 0
 *               category:
 *                 type: string
 *                 example: "Death Note"
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 example: "medium"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Question créée avec succès
 *       400:
 *         description: Erreur de validation
 *       403:
 *         description: Accès refusé
 */
router.post('/', adminController.createQuestion);

/**
 * @swagger
 * /api/admin/questions:
 *   get:
 *     summary: Récupère toutes les questions avec pagination (Admin uniquement)
 *     tags: [Admin - Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 20
 *     responses:
 *       200:
 *         description: Liste des questions
 */
router.get('/', adminController.getAllQuestions);

/**
 * @swagger
 * /api/admin/questions/stats:
 *   get:
 *     summary: Récupère les statistiques des questions (Admin uniquement)
 *     tags: [Admin - Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */
router.get('/stats', adminController.getQuestionStats);

/**
 * @swagger
 * /api/admin/questions/{id}:
 *   get:
 *     summary: Récupère une question par ID (Admin uniquement)
 *     tags: [Admin - Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question récupérée
 *       404:
 *         description: Question non trouvée
 */
router.get('/:id', adminController.getQuestionById);

/**
 * @swagger
 * /api/admin/questions/{id}:
 *   put:
 *     summary: Met à jour une question (Admin uniquement)
 *     tags: [Admin - Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Question mise à jour
 *       404:
 *         description: Question non trouvée
 */
router.put('/:id', adminController.updateQuestion);

/**
 * @swagger
 * /api/admin/questions/{id}:
 *   delete:
 *     summary: Supprime une question (Admin uniquement)
 *     tags: [Admin - Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question supprimée
 *       404:
 *         description: Question non trouvée
 */
router.delete('/:id', adminController.deleteQuestion);

module.exports = router;
