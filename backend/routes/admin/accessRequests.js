const express = require('express');
const router = express.Router();
const { getAccessRequests } = require('../../controllers/admin/getAccessRequests');
const authenticateToken = require('../../middlewares/authenticateToken');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const rbac = require('../../middlewares/rbac');

router.use(authenticateToken);
router.use(rbac.requireAdmin);
router.use(handleValidationErrors);

// Admin only route to get access requests
router.get('/access-requests', getAccessRequests);

module.exports = router;