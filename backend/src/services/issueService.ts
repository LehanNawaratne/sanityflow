import Issue from '../models/Issue.js';
import type { IIssue } from '../models/Issue.js';
import type { UpdateIssueStatusData } from '../types/issueSchemas.js';

// Business logic for issue operations
export const createNewIssue = async (data: { description: string; location: string }, userId: string): Promise<IIssue> => {
  // Business rule: Check for duplicate pending issues in same location
  const existingIssue = await Issue.findOne({
    location: data.location,
    status: 'Pending',
    description: { $regex: data.description, $options: 'i' }
  });

  if (existingIssue) {
    throw new Error('A similar issue is already reported and pending in this location');
  }

  // Create new issue
  const issue = new Issue({
    ...data,
    reporter: userId,
    status: 'Pending'
  });

  return await issue.save();
};

export const getAllIssuesService = async (): Promise<IIssue[]> => {
  return await Issue.find().populate('reporter', 'name email').sort({ createdAt: -1 });
};

export const updateIssueStatusService = async (id: string, status: 'Pending' | 'In Progress' | 'Resolved'): Promise<IIssue> => {
  const issue = await Issue.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
};

export const getIssueByIdService = async (id: string): Promise<IIssue> => {
  const issue = await Issue.findById(id).populate('reporter', 'name email');
  if (!issue) {
    throw new Error('Issue not found');
  }
  return issue;
};