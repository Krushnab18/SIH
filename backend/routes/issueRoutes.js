const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, issueController.createIssue);
router.get('/', authMiddleware, issueController.getIssues);
router.get('/:id', authMiddleware, issueController.getIssueDetail);
router.patch('/:id/status', authMiddleware, issueController.updateIssueStatus);

module.exports = router;
