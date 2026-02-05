/**
 * @swagger
 * /user/public:
 *   get:
 *     summary: Get public projects
 *     description: Retrieve a list of all public projects that are not archived. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Public projects retrieved successfully
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
 *                   example: Public projects retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Project ID
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: Project title
 *                         example: E-commerce Platform
 *                       description:
 *                         type: string
 *                         description: Project description
 *                         example: A full-featured e-commerce platform with payment integration
 *                       tech_stack:
 *                         type: string
 *                         description: Technologies used
 *                         example: React, Node.js, PostgreSQL
 *                       repo_url:
 *                         type: string
 *                         description: Repository URL
 *                         example: https://github.com/user/project
 *                       status:
 *                         type: string
 *                         enum: [planning, testing, completed, live, on_hold, archived]
 *                         description: Project status
 *                         example: live
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Creation timestamp
 *                         example: 2024-01-15T10:30:00Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: Last update timestamp
 *                         example: 2024-01-20T14:45:00Z
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access token is required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /user/public/{id}:
 *   get:
 *     summary: Get public project by ID
 *     description: Retrieve details of a specific public project by its ID. Project must be public and not archived. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Public project retrieved successfully
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
 *                   example: Public project retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Project ID
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: Project title
 *                       example: E-commerce Platform
 *                     description:
 *                       type: string
 *                       description: Project description
 *                       example: A full-featured e-commerce platform with payment integration
 *                     tech_stack:
 *                       type: string
 *                       description: Technologies used
 *                       example: React, Node.js, PostgreSQL
 *                     repo_url:
 *                       type: string
 *                       description: Repository URL
 *                       example: https://github.com/user/project
 *                     status:
 *                       type: string
 *                       enum: [planning, testing, completed, live, on_hold, archived]
 *                       description: Project status
 *                       example: live
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Creation timestamp
 *                       example: 2024-01-15T10:30:00Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Last update timestamp
 *                       example: 2024-01-20T14:45:00Z
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access token is required
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Project not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */