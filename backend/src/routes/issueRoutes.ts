import express from 'express';
import { 
  createIssueController, 
  getIssuesController, 
  updateIssueStatusController,
  getIssueByIdController,
  updateIssueController,
  deleteIssueController
} from '../controllers/issueController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/issues - Create a new issue
router.post('/', auth, createIssueController);

// GET /api/v1/issues - Get all issues (with filtering support)
router.get('/', auth, getIssuesController);

// GET /api/v1/issues/:id - Get specific issue by ID
router.get('/:id', auth, getIssueByIdController);

// PUT /api/v1/issues/:id - Update full issue details
router.put('/:id', auth, updateIssueController);

// PATCH /api/v1/issues/:id/status - Update only issue status
router.patch('/:id/status', auth, updateIssueStatusController);

// DELETE /api/v1/issues/:id - Delete issue
router.delete('/:id', auth, deleteIssueController);

export default router;