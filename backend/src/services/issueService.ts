import Issue from '../models/Issue.js';
import type { IIssue } from '../models/Issue.js';
import type { UpdateIssueStatusData, CreateIssueData, UpdateIssueData } from '../types/issueSchemas.js';

// Business logic for issue operations
export const createNewIssue = async (data: CreateIssueData, userId: string): Promise<IIssue> => {
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

export const getAllIssuesService = async (filters?: {
  type?: string;
  priority?: string; 
  status?: string;
  area?: string;
  assignedTo?: string;
}): Promise<IIssue[]> => {
  const query: any = {};
  
  if (filters?.type) query.type = { $regex: filters.type, $options: 'i' };
  if (filters?.priority) query.priority = filters.priority;
  if (filters?.status) query.status = filters.status;
  if (filters?.area) query.area = { $regex: filters.area, $options: 'i' };
  if (filters?.assignedTo) query.assignedTo = filters.assignedTo;

  return await Issue.find(query)
    .populate('reporter', 'name email')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
};

export const updateIssueStatusService = async (id: string, status: 'Pending' | 'In Progress' | 'Resolved'): Promise<IIssue> => {
  const issue = await Issue.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('reporter', 'name email').populate('assignedTo', 'name email');

  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
};

// New function to update full issue details
export const updateIssueService = async (id: string, data: UpdateIssueData): Promise<IIssue> => {
  const issue = await Issue.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  ).populate('reporter', 'name email').populate('assignedTo', 'name email');

  if (!issue) {
    throw new Error('Issue not found');
  }

  return issue;
};

// New function to delete issue
export const deleteIssueService = async (id: string): Promise<void> => {
  const issue = await Issue.findByIdAndDelete(id);
  
  if (!issue) {
    throw new Error('Issue not found');
  }
};

export const getIssueByIdService = async (id: string): Promise<IIssue> => {
  const issue = await Issue.findById(id)
    .populate('reporter', 'name email')
    .populate('assignedTo', 'name email');
  if (!issue) {
    throw new Error('Issue not found');
  }
  return issue;
};