import express from 'express';
import { createIssue, getIssues, updateIssueStatus } from '../controllers/issueController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/issues - Create a new issue
router.post('/', auth, createIssue);

// GET /api/v1/issues - Get all issues
router.get('/', auth, getIssues);

// PUT /api/v1/issues/:id - Update issue status
router.put('/:id', auth, updateIssueStatus);

export default router;