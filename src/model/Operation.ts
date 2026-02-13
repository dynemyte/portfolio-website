/**
 * Operation (Mission / Case File) Model
 * Represents a mission or operation that operatives can be assigned to
 */

/**
 * Operation Priority values
 */
export enum OperationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Operation Status values
 */
export enum OperationStatus {
  DRAFT = 'draft',
  PLANNED = 'planned',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

/**
 * Operation interface
 */
export interface Operation {
  id: string;
  title: string;
  description: string;
  priority: OperationPriority;
  status: OperationStatus;
  alerts: string[];
  createdAt: string;
  location: string | null;
  difficulty: string | null;
}
