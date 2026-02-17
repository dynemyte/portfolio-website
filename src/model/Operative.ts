/**
 * Operative (Cat Agent) Model
 * Represents an individual cat operative with static profile and current state
 */

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
 * Operative Role values
 */
export enum Role {
  MEDIC = 'medic',
  HACKER = 'hacker',
  SCOUT = 'scout',
  MUSCLE = 'muscle',
  LEADER = 'leader',
  SUPPORT = 'support',
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
  role: Role;
  createdAt: string;

  // Current State (Changes Often)
  status: OperativeStatus;
  health: number;
  alerts: string[];
  location: string;
}
