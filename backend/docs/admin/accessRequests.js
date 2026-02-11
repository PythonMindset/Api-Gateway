/**
 * @swagger
 * /admin/access-requests:
 *   get:
 *     summary: Get all access requests
 *     description: Retrieve a list of all access requests with user details (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access requests retrieved successfully
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
 *                   example: "Access requests retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "viewer@example.com"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       description:
 *                         type: string
 *                         example: "Requesting access to manage projects"
 *                       status:
 *                         type: string
 *                         enum: [active, deactivated]
 *                         example: "active"
 *                       requested_on:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T10:00:00Z"
 *                       last_active:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2023-10-05T14:30:00Z"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2023-09-15T09:00:00Z"
 *                       user_name:
 *                         type: string
 *                         nullable: true
 *                         example: "John Doe"
 *                       role:
 *                         type: string
 *                         enum: [admin, viewer]
 *                         nullable: true
 *                         example: "viewer"
 *       401:
 *         description: Authentication required
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
 *                   example: "Authentication required"
 *                 status:
 *                   type: integer
 *                   example: 401
 *       403:
 *         description: Access denied - Admin role required
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
 *                   example: "Access denied. You do not have permission to access this resource."
 *                 status:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
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
 *                   example: "Failed to retrieve access requests"
 *                 status:
 *                   type: integer
 *                   example: 500
 */