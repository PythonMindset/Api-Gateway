/**
 * @swagger
 * components:
 *   schemas:
 *     ApiLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the API log entry
 *         endpoint:
 *           type: string
 *           description: The API endpoint that was called
 *         method:
 *           type: string
 *           enum: [GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD]
 *           description: HTTP method used for the request
 *         status_code:
 *           type: integer
 *           description: HTTP response status code
 *         user_id:
 *           type: integer
 *           nullable: true
 *           description: ID of the authenticated user (null for unauthenticated requests)
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When the API call was made
 *       example:
 *         id: 1
 *         endpoint: "/user/change-password"
 *         method: "PUT"
 *         status_code: 200
 *         user_id: 123
 *         timestamp: "2024-01-15T10:30:00Z"
 *
 * info:
 *   description: |
 *     ## API Logging
 *
 *     All API requests are automatically logged to the `api_logs` table with the following information:
 *     - **Endpoint**: The API endpoint called
 *     - **Method**: HTTP method (GET, POST, PUT, DELETE, etc.)
 *     - **Status Code**: HTTP response status code
 *     - **User ID**: ID of authenticated user (null for public endpoints)
 *     - **Timestamp**: When the request was made
 *
 *     This logging happens asynchronously and does not affect API response times.
 */