/**
 * Operative (Cat Agent) Model
 * Represents an individual cat operative with static profile and current state
 */

/**
 * Operative object structure
 */
export const Operative = {
  // Static Profile (Rarely Changes)
  id: '',
  codename: '',
  avatarUrl: '',
  bio: null,
  quirks: null,
  specialties: [],
  createdAt: '',

  // Current State (Changes Often)
  status: 'available',
  currentOperationId: null,
  lastSeenAt: '',
  health: 100,
  energy: 100,
};

/**
 * Operative Status values
 */
export const OperativeStatus = {
  AVAILABLE: 'available',
  DEPLOYED: 'deployed',
  RECOVERING: 'recovering',
  OFFLINE: 'offline',
};
