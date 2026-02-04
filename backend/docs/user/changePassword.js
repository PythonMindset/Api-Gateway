/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Change user password
 *     description: Change the authenticated user's own password. Rate limited per user based on environment configuration.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 description: New password (min 8 chars, must contain uppercase, lowercase, and number)
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation (must match newPassword)
 *     responses:
 *       200:
 *         description: Password changed successfully
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
 *                   example: Password changed successfully
 *         headers:
 *           RateLimit-Limit:
 *             description: Maximum number of requests allowed per window
 *             schema:
 *               type: string
 *               example: "100"
 *           RateLimit-Remaining:
 *             description: Number of requests remaining in current window
 *             schema:
 *               type: string
 *               example: "99"
 *           RateLimit-Reset:
 *             description: Timestamp when the rate limit resets
 *             schema:
 *               type: string
 *               example: "1707148800000"
 *       400:
 *         description: Validation error or incorrect current password
 *         content:
 *           application/json:
 *             examples:
 *               validationError:
 *                 summary: Validation failed
 *                 value:
 *                   success: false
 *                   message: "Validation failed"
 *                   status: 400
 *                   errors:
 *                     - field: "newPassword"
 *                       message: "New password must be at least 8 characters long"
 *                       value: "short"
 *                     - field: "confirmPassword"
 *                       message: "Password confirmation does not match new password"
 *                       value: "different"
 *               currentPasswordError:
 *                 summary: Incorrect current password
 *                 value:
 *                   success: false
 *                   message: "Current password is incorrect"
 *                   status: 400
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden - Invalid token or access denied
 *         content:
 *           application/json:
 *             examples:
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   message: "Invalid token"
 *                   status: 403
 *               accessDenied:
 *                 summary: Access denied - cannot change another user's password
 *                 value:
 *                   success: false
 *                   message: "Access denied: Cannot change another user's password"
 *                   status: 403
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Server error
 */