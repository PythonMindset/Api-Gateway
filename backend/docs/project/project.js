/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints (Admin Only)
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get user's projects
 *     description: Admin only - Retrieve a list of projects created by the authenticated admin user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
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
 *                   example: Projects retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Admin only - Retrieve a specific project by ID (admin's own or public)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project details
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
 *                   example: Project retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project (Admin Only)
 *     description: Create a new project for the authenticated admin user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 255
 *                 example: My Awesome Project
 *               description:
 *                 type: string
 *                 example: A description of the project
 *               tech_stack:
 *                 type: string
 *                 example: Node.js, React, PostgreSQL
 *               repo_url:
 *                 type: string
 *                 format: uri
 *                 maxLength: 500
 *                 example: https://github.com/user/repo
 *               status:
 *                 type: string
 *                 enum: [planning, testing, completed, live, on_hold, archived]
 *                 example: planning
 *               is_public:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *     responses:
 *       201:
 *         description: Project created successfully
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
 *                   example: Project created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     description: Update an existing project owned by the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 255
 *                 example: Updated Project Title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               tech_stack:
 *                 type: string
 *                 example: Updated tech stack
 *               repo_url:
 *                 type: string
 *                 format: uri
 *                 maxLength: 500
 *                 example: https://github.com/user/updated-repo
 *               status:
 *                 type: string
 *                 enum: [planning, testing, completed, live, on_hold, archived]
 *                 example: live
 *               is_public:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Project updated successfully
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
 *                   example: Project updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found or not authorized
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Delete an existing project owned by the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
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
 *                   example: Project deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Project not found or not authorized
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: My Project
 *         description:
 *           type: string
 *           example: Project description
 *         tech_stack:
 *           type: string
 *           example: Node.js, React
 *         repo_url:
 *           type: string
 *           format: uri
 *           example: https://github.com/user/repo
 *         status:
 *           type: string
 *           enum: [planning, testing, completed, live, on_hold, archived]
 *           example: planning
 *         is_public:
 *           type: boolean
 *           example: false
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2023-01-01T00:00:00.000Z
 *         created_by:
 *           type: integer
 *           example: 1
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: 2023-01-01T00:00:00.000Z
 */