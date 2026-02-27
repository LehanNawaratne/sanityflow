import express from 'express';
import {
  createIssueController,
  getIssuesController,
  getIssueByIdController,
  updateIssueController,
  deleteIssueController
} from '../controllers/issue.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/',  createIssueController);
router.get('/',  getIssuesController);
router.get('/:id', getIssueByIdController);
router.put('/:id', updateIssueController);
router.delete('/:id',  deleteIssueController);

export default router;