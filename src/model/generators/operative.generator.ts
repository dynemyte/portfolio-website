import { faker } from '@faker-js/faker';
import { Operative, OperativeStatus } from '../Operative';
import { RoleType } from '../Role';

export function generateOperative(): Operative {
  return {
    id: faker.string.uuid(),
    codename: faker.word.words(2),
    avatarUrl: faker.image.url(),
    profile: faker.lorem.sentence(),
    role: faker.helpers.arrayElement([
      RoleType.MEDIC,
      RoleType.HACKER,
      RoleType.SCOUT,
      RoleType.MUSCLE,
      RoleType.LEADER,
      RoleType.SUPPORT,
    ]),
    createdAt: faker.date.past().toISOString(),

    status: faker.helpers.arrayElement([
      OperativeStatus.AVAILABLE,
      OperativeStatus.DEPLOYED,
      OperativeStatus.RECOVERING,
      OperativeStatus.OFFLINE,
    ]),
    health: faker.number.int({ min: 10, max: 100 }),
    alerts: [],
    location: faker.location.city(),
  };
}

export function generateOperatives(count: number): Operative[] {
  return Array.from({ length: count }, () => generateOperative());
}
