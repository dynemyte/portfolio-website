/**
 * Role Model
 * Defines the role/specialty of an operative
 * 
 * Relationships:
 * - Each role belongs to ONE operative
 * - Each operative can have MANY roles
 */

/**
 * Role object structure
 */
export const Role = {
  id: 'medic',
  
  title: '',
  description: '',              // The operative's role/specialty
  assignedAt: '',
  
};

/**
 * Role Type values
 */
export const RoleType = {
  MEDIC: 'medic',
  HACKER: 'hacker',
  SCOUT: 'scout',
  MUSCLE: 'muscle',
  LEADER: 'leader',
  SUPPORT: 'support',
};
