import express from 'express';
import {
  createIssueController,
  getIssuesController,
  getIssueByIdController,
  updateIssueController,
  deleteIssueController
} from '../controllers/issueController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST   /api/issues        — Submit a new issue report
router.post('/',    auth, createIssueController);

// GET    /api/issues        — Retrieve all issues (filter: ?status=&priority=&issueType=)
router.get('/',    auth, getIssuesController);

// GET    /api/issues/:id    — Retrieve a specific issue
router.get('/:id', auth, getIssueByIdController);

// PUT    /api/issues/:id    — Update status, assignment, or resolution notes
router.put('/:id', auth, updateIssueController);

// DELETE /api/issues/:id    — Remove a duplicate or invalid issue report
router.delete('/:id', auth, deleteIssueController);

export default router;