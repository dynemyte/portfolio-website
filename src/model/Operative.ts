/**
 * Operative (Cat Agent) Model
 * Represents an individual cat operative with static profile and current state
 */

import { RoleType } from './Role';

/**
 * Operative Status values
 */
export enum OperativeStatus {
  AVAILABLE = 'available',
  DEPLOYED = 'deployed',
  RECOVERING = 'recovering',
  OFFLINE = 'offline',
}

/**
 * Operative interface
 */
export interface Operative {
  // Static Profile (Rarely Changes)
  id: string;
  codename: string;
  avatarUrl: string;
  profile: string;
  role: RoleType;
  assignedAt: string;
  createdAt: string;

  // Current State (Changes Often)
  status: OperativeStatus;
  health: number;
  alerts: string[];
  location: string;
}
