/**
 * @swagger
 * /auth/access-request:
 *   post:
 *     summary: Request access (create user account)
 *     description: Creates a new user account with a randomly generated password for the Project Manager platform
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               description:
 *                 type: string
 *                 example: Requesting access to manage projects
 *     responses:
 *       200:
 *         description: Access request processed successfully
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
 *                   example: Access request processed successfully. Check your email for login credentials.
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         email:
 *                           type: string
 *                           example: newuser@example.com
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         role:
 *                           type: string
 *                           example: viewer
 *       400:
 *         description: Validation error
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
 *                   example: Validation failed
 *                 status:
 *                   type: integer
 *                   example: 400
 *       409:
 *         description: User already exists
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
 *                   example: User already exists
 *                 status:
 *                   type: integer
 *                   example: 409
 *       500:
 *         description: Server error or email sending failure
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
 *                   example: Failed to send welcome email. Please try again later.
 *                 status:
 *                   type: integer
 *                   example: 500
 */