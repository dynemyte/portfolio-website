import { faker } from '@faker-js/faker';
import { Role, RoleType } from '../Role';

const roleTitles: Record<RoleType, string> = {
  [RoleType.MEDIC]: 'Field Medic',
  [RoleType.HACKER]: 'Cyber Specialist',
  [RoleType.SCOUT]: 'Reconnaissance Expert',
  [RoleType.MUSCLE]: 'Heavy Assault',
  [RoleType.LEADER]: 'Team Leader',
  [RoleType.SUPPORT]: 'Support Specialist',
};

const roleDescriptions: Record<RoleType, string> = {
  [RoleType.MEDIC]: 'Provides medical support and emergency care in the field',
  [RoleType.HACKER]: 'Specializes in cyber operations and technical infiltration',
  [RoleType.SCOUT]: 'Expert in reconnaissance and intelligence gathering',
  [RoleType.MUSCLE]: 'Handles heavy combat and security operations',
  [RoleType.LEADER]: 'Coordinates team operations and strategic planning',
  [RoleType.SUPPORT]: 'Provides logistics and tactical support',
};

export function generateRole(roleType?: RoleType): Role {
  const id = roleType || faker.helpers.arrayElement([
    RoleType.MEDIC,
    RoleType.HACKER,
    RoleType.SCOUT,
    RoleType.MUSCLE,
    RoleType.LEADER,
    RoleType.SUPPORT,
  ]);

  return {
    id,
    title: roleTitles[id],
    description: roleDescriptions[id],
    assignedAt: faker.date.past().toISOString(),
  };
}

export function generateRoles(count?: number): Role[] {
  const allRoleTypes = [
    RoleType.MEDIC,
    RoleType.HACKER,
    RoleType.SCOUT,
    RoleType.MUSCLE,
    RoleType.LEADER,
    RoleType.SUPPORT,
  ];

  // If count is not specified, generate all roles
  if (!count) {
    return allRoleTypes.map(roleType => generateRole(roleType));
  }

  return Array.from({ length: count }, () => generateRole());
}
