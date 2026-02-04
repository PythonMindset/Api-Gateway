/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * info:
 *   description: |
 *     ## Role-Based Access Control (RBAC)
 *
 *     This API implements role-based access control with the following user roles:
 *
 *     ### User Roles:
 *     - **admin**: Full access to all endpoints and operations
 *     - **viewer**: Limited access, cannot perform user management operations
 *
 *     ### Access Control Rules:
 *     - **Authentication Required**: Most endpoints require valid JWT token
 *     - **Admin-Only Operations**: User management operations (password changes, etc.) require admin role
 *     - **Viewer Access**: Can access read-only operations and basic functionality
 *
 *     ### Common HTTP Status Codes:
 *     - `401 Unauthorized`: Missing or invalid authentication token
 *     - `403 Forbidden`: Valid authentication but insufficient permissions
 *     - `200 OK`: Successful operation
 *
 *     ### Example Error Responses:
 *
 *     **Insufficient Permissions:**
 *     ```json
 *     {
 *       "success": false,
 *       "message": "Access denied. You do not have permission to access this resource. Admin role required.",
 *       "status": 403
 *     }
 *     ```
 *
 *     **Authentication Required:**
 *     ```json
 *     {
 *       "success": false,
 *       "message": "Authentication required",
 *       "status": 401
 *     }
 *     ```
 */