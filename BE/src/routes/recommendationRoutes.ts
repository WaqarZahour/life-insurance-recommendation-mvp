import { Router } from 'express';
import { RecommendationController } from '../controllers/recommendationController';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Life Insurance Recommendation API is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/health', RecommendationController.healthCheck);

/**
 * @swagger
 * /recommendation:
 *   post:
 *     summary: Generate life insurance recommendation
 *     description: Generate a personalized life insurance recommendation based on user input
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecommendationInput'
 *           examples:
 *             young_high_risk:
 *               summary: Young person with high risk tolerance
 *               value:
 *                 age: 35
 *                 income: 60000
 *                 dependents: 1
 *                 riskTolerance: high
 *             older_low_risk:
 *               summary: Older person with low risk tolerance
 *               value:
 *                 age: 55
 *                 income: 80000
 *                 dependents: 0
 *                 riskTolerance: low
 *             high_income_many_dependents:
 *               summary: High income with many dependents
 *               value:
 *                 age: 40
 *                 income: 120000
 *                 dependents: 3
 *                 riskTolerance: medium
 *     responses:
 *       201:
 *         description: Recommendation generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/RecommendationResponse'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/recommendation', RecommendationController.createRecommendation);

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Get all recommendations
 *     description: Retrieve all stored recommendations (for analytics/admin purposes)
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of all recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       age:
 *                         type: integer
 *                       income:
 *                         type: number
 *                       dependents:
 *                         type: integer
 *                       riskTolerance:
 *                         type: string
 *                       recommendation:
 *                         type: string
 *                       explanation:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 count:
 *                   type: integer
 *                   description: Total number of recommendations
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/recommendations', RecommendationController.getAllRecommendations);

/**
 * @swagger
 * /recommendations/stats:
 *   get:
 *     summary: Get recommendation statistics
 *     description: Get analytics and statistics about recommendations
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Recommendation statistics
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
 *                     totalRecommendations:
 *                       type: integer
 *                       description: Total number of recommendations
 *                     averageAge:
 *                       type: number
 *                       description: Average age of users
 *                     averageIncome:
 *                       type: number
 *                       description: Average income of users
 *                     riskToleranceDistribution:
 *                       type: object
 *                       description: Distribution of risk tolerance levels
 *                       properties:
 *                         low:
 *                           type: integer
 *                         medium:
 *                           type: integer
 *                         high:
 *                           type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/recommendations/stats', RecommendationController.getRecommendationStats);

export default router; 