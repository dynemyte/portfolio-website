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
  profile: '',
  role: '',
  createdAt: '',

  // Current State (Changes Often)
  status: 'available',
  health: 100,
  alerts: [],
  location: '',              // Current location of the operative
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
