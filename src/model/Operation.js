/**
 * Operation (Mission / Case File) Model
 * Represents a mission or operation that operatives can be assigned to
 */

/**
 * Operation object structure
 */
export const Operation = {
  id: '',
  title: '',
  description: '',
  priority: 'medium',
  status: 'draft',
  
  alerts: [],              // Array of alert IDs related to this operation
  
  createdAt: '',
  
  // Optional future fields
  location: null,
  difficulty: null,
};

/**
 * Operation Priority values
 */
export const OperationPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

/**
 * Operation Status values
 */
export const OperationStatus = {
  DRAFT: 'draft',
  PLANNED: 'planned',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};
