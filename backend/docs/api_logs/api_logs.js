/**
 * @swagger
 * tags:
 *   name: API Logs
 *   description: API request logging endpoints (Admin Only)
 */

/**
 * @swagger
 * /api-logs:
 *   get:
 *     summary: Get API logs (Admin Only)
 *     description: Retrieve paginated API request logs with optional filtering. Admin access required.
 *     tags: [API Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of logs per page
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Filter by user ID
 *       - in: query
 *         name: endpoint
 *         schema:
 *           type: string
 *           maxLength: 500
 *         description: Filter by endpoint (partial match)
 *       - in: query
 *         name: method
 *         schema:
 *           type: string
 *           enum:
 *             - GET
 *             - POST
 *             - PUT
 *             - DELETE
 *             - PATCH
 *             - OPTIONS
 *             - HEAD
 *         description: Filter by HTTP method
 *       - in: query
 *         name: status_code
 *         schema:
 *           type: integer
 *           minimum: 100
 *           maximum: 599
 *         description: Filter by HTTP status code
 *     responses:
 *       200:
 *         description: API logs retrieved successfully
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
 *                   example: API logs retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     logs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ApiLog'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 50
 *                         total:
 *                           type: integer
 *                           example: 150
 *                         pages:
 *                           type: integer
 *                           example: 3
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         endpoint:
 *           type: string
 *           example: "/projects"
 *         method:
 *           type: string
 *           example: "GET"
 *         status_code:
 *           type: integer
 *           example: 200
 *         user_id:
 *           type: integer
 *           nullable: true
 *           example: 123
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00.000Z"
 */