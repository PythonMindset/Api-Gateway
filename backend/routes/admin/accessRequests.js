const express = require('express');
const router = express.Router();
const { getAccessRequests } = require('../../controllers/admin/getAccessRequests');
const authenticateToken = require('../../middlewares/authenticateToken');
const rbac = require('../../middlewares/rbac');

// Admin only route to get access requests
router.get('/access-requests', authenticateToken, rbac.requireAdmin, getAccessRequests);

module.exports = router;