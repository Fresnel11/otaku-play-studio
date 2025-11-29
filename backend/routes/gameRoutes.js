const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

/**
 * @swagger
 * /api/games/speed-pulse/questions:
 *   get:
 *     summary: Récupère 10 questions aléatoires pour SpeedPulse Quiz
 *     tags: [SpeedPulse Quiz]
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Niveau de difficulté des questions
 *     responses:
 *       200:
 *         description: Questions récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: string
 *                       difficulty:
 *                         type: string
 *       400:
 *         description: Erreur lors de la récupération
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/speed-pulse/questions', gameController.getQuestions);

/**
 * @swagger
 * /api/games/speed-pulse/start:
 *   post:
 *     summary: Démarre une nouvelle session de jeu
 *     tags: [SpeedPulse Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Session créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionId:
 *                       type: string
 *                     questions:
 *                       type: array
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/speed-pulse/start', gameController.startGame);

/**
 * @swagger
 * /api/games/survival/start:
 *   post:
 *     summary: Démarre une nouvelle session de jeu Mode Survie
 *     tags: [Survival Mode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Session créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionId:
 *                       type: string
 *                     questions:
 *                       type: array
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/survival/start', gameController.startSurvival);

/**
 * @swagger
 * /api/games/speed-pulse/submit:
 *   post:
 *     summary: Soumet les résultats d'une partie
 *     tags: [SpeedPulse Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - userId
 *               - answers
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               userId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     userAnswer:
 *                       type: number
 *                       minimum: 0
 *                       maximum: 3
 *                     responseTime:
 *                       type: number
 *                       description: Temps de réponse en millisecondes
 *     responses:
 *       200:
 *         description: Résultats enregistrés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     finalScore:
 *                       type: number
 *                     correctAnswers:
 *                       type: number
 *                     maxCombo:
 *                       type: number
 *                     overdriveTriggered:
 *                       type: boolean
 *                     xpEarned:
 *                       type: number
 *                     rank:
 *                       type: number
 *       400:
 *         description: Erreur lors de la soumission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/speed-pulse/submit', gameController.submitGame);

/**
 * @swagger
 * /api/games/survival/submit:
 *   post:
 *     summary: Soumet les résultats d'une partie en Mode Survie
 *     tags: [Survival Mode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - userId
 *               - answers
 *             properties:
 *               sessionId:
 *                 type: string
 *               userId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     userAnswer:
 *                       type: number
 *                     responseTime:
 *                       type: number
 *     responses:
 *       200:
 *         description: Résultats enregistrés avec succès
 */
router.post('/survival/submit', gameController.submitGame);

/**
 * @swagger
 * /api/games/memory/start:
 *   post:
 *     summary: Démarre une nouvelle session de Memory Kawaii
 *     tags: [Memory Kawaii]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session créée avec succès
 */
router.post('/memory/start', gameController.startMemory);

/**
 * @swagger
 * /api/games/memory/submit:
 *   post:
 *     summary: Soumet les résultats d'une partie de Memory Kawaii
 *     tags: [Memory Kawaii]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - userId
 *               - score
 *             properties:
 *               sessionId:
 *                 type: string
 *               userId:
 *                 type: string
 *               score:
 *                 type: number
 *               timeTaken:
 *                 type: number
 *               attempts:
 *                 type: number
 *               pairsFound:
 *                 type: number
 *               success:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Résultats enregistrés avec succès
 */
router.post('/memory/submit', gameController.submitMemory);

/**
 * @swagger
 * /api/games/speed-pulse/leaderboard:
 *   get:
 *     summary: Récupère le classement des meilleurs joueurs
 *     tags: [SpeedPulse Quiz]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Nombre de joueurs à afficher
 *     responses:
 *       200:
 *         description: Classement récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rank:
 *                         type: number
 *                       username:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                       level:
 *                         type: number
 *                       bestScore:
 *                         type: number
 *                       totalGames:
 *                         type: number
 */
router.get('/speed-pulse/leaderboard', gameController.getLeaderboard);

/**
 * @swagger
 * /api/games/speed-pulse/stats/{userId}:
 *   get:
 *     summary: Récupère les statistiques d'un joueur
 *     tags: [SpeedPulse Quiz]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalGames:
 *                       type: number
 *                     bestScore:
 *                       type: number
 *                     averageScore:
 *                       type: number
 *                     lastPlayed:
 *                       type: string
 *                       format: date-time
 */
router.get('/speed-pulse/stats/:userId', gameController.getUserStats);

/**
 * @swagger
 * /api/games/survival/leaderboard:
 *   get:
 *     summary: Récupère le classement des meilleurs joueurs en Mode Survie
 *     tags: [Survival Mode]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Nombre de joueurs à afficher
 *     responses:
 *       200:
 *         description: Classement récupéré avec succès
 */
router.get('/survival/leaderboard', (req, res) => {
    req.query.gameType = 'survival';
    return gameController.getLeaderboard(req, res);
});

/**
 * @swagger
 * /api/games/survival/stats/{userId}:
 *   get:
 *     summary: Récupère les statistiques d'un joueur en Mode Survie
 *     tags: [Survival Mode]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 */
router.get('/survival/stats/:userId', (req, res) => {
    req.query.gameType = 'survival';
    return gameController.getUserStats(req, res);
});

module.exports = router;
