/**
 * Role Model
 * Defines the role/specialty of an operative
 * 
 * Relationships:
 * - Each role belongs to ONE operative
 * - Each operative can have MANY roles
 */

/**
 * Role Type values
 */
export enum RoleType {
  MEDIC = 'medic',
  HACKER = 'hacker',
  SCOUT = 'scout',
  MUSCLE = 'muscle',
  LEADER = 'leader',
  SUPPORT = 'support',
}

/**
 * Role interface
 */
export interface Role {
  id: RoleType;
  title: string;
  description: string;
}
