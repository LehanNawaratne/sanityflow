import express from 'express';
import { createIssueController, getIssuesController, updateIssueStatusController } from '../controllers/issueController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/issues - Create a new issue
router.post('/', auth, createIssueController);

// GET /api/v1/issues - Get all issues
router.get('/', auth, getIssuesController);

// PUT /api/v1/issues/:id - Update issue status
router.put('/:id', auth, updateIssueStatusController);

export default router;